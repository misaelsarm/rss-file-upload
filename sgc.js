auth.onAuthStateChanged(user => {
    if (user) {
        if (user.email === "test@rssorting.com") {
            console.log("true");
        }

        const welcome = document.querySelector('#welcome')
        const name = `Bienvenido <b>${user.email}</b>`
        welcome.innerHTML = name
        render();
    } else {
        window.location.href = "login.html"
    }
})

function render() {
    db.collection('sgc').get().then((snapshot) => {
        let fileList = document.getElementById("fileList");
        snapshot.docs.forEach(doc => {
            const filename = doc.data().fileName;
            var storageRef = firebase.storage().ref('');
            url = storageRef.child('files/sgc/' + filename).getDownloadURL().then((url) => {
                // console.log(url)
                let div = document.createElement('div');

                let descargar = document.createElement('a')
                let eliminar = document.createElement('p')

                let name = document.createElement('p');
                let file = document.createElement('p');
                let date = document.createElement('p');
                let time = document.createElement('p');

                let data = document.createElement('div')
                let icon = document.createElement('div')

                icon.setAttribute('data-id', doc.id);
                descargar.setAttribute('href', url)
                descargar.setAttribute('target', "_blank")

                file.style.fontWeight = "bold"
                descargar.style.fontWeight = "bold"
                eliminar.style.fontWeight = "bold"

                file.textContent = "Nombre de archivo: " + doc.data().fileName
                name.textContent = "Subido por: " + doc.data().uploadUser
                date.textContent = "Dia de carga: " + doc.data().uploadDate
                time.textContent = "Fecha de carga: " + doc.data().uploadTime
                descargar.textContent = "Descargar"
                eliminar.textContent = "Eliminar"

                div.appendChild(data)
                div.appendChild(icon)
                data.appendChild(file);
                data.appendChild(name);
                data.appendChild(date);
                data.appendChild(time);
                icon.appendChild(descargar)
                icon.appendChild(eliminar)
                fileList.appendChild(div);

                div.classList.add("files");
                data.classList.add("data");
                icon.classList.add("icon");
                descargar.classList.add("descargar");
                eliminar.classList.add("eliminar");

                eliminar.addEventListener('click', (e) => {
                    console.log(filename);
                    e.stopPropagation();
                    let id = e.target.parentElement.getAttribute('data-id');
                    db.collection('sgc').doc(id).delete()
                    var deleteRef = storageRef.child('files/sgc/' + filename);
                    deleteRef.delete().then(() => {
                        window.location.href = "sgc.html"
                    })
                })
            })
        })
    })
}

/* function showDepartments() {
    sgc = document.getElementById("sgc")
} */

function uploadFile() {
    showModal();
    var fileButton = document.getElementById('fileButton');
    fileButton.addEventListener('change', (e) => {

        var file = e.target.files[0];
        var storageRef = firebase.storage().ref('files/sgc/' + file.name);
        storageRef.put(file).then(() => {
            window.location.href = "sgc.html"
        });
        var user = firebase.auth().currentUser;
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //console.log(date);
        db.collection('sgc').add({
            fileName: file.name,
            uploadUser: user.email,
            uploadDate: date,
            uploadTime: time,
        })
        closeModal();
        loading();
    })

    let cancelar = document.getElementById("cancelar").addEventListener('click', closeModal)
}

function showModal() {

    document.getElementById("modal").style.transform = "scale(1,1)";
    document.getElementById("overlay").style.opacity = "0.5";
    document.getElementById("overlay").style.zIndex = "100";
}

function closeModal() {
    document.getElementById("modal").style.transform = "scale(0,0)";
    document.getElementById("overlay").style.opacity = "0";
    document.getElementById("overlay").style.zIndex = "-10";
}

function loading() {
    document.getElementById("loading").style.display = "flex";
    document.getElementById("overlay").style.opacity = "0.5";
    document.getElementById("overlay").style.zIndex = "100";
}

const cargar = document.querySelector('#cargar');
cargar.addEventListener('click', uploadFile)