auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('calidad').orderBy("uploadTime", "desc").get().then(snapshot => {
            showFiles(snapshot.docs);
        })
        const welcome = document.querySelector('#welcome')
        const name = `Bienvenido <b>${user.email}</b>`
        welcome.innerHTML = name
    } else {
        window.location.href = "login.html"
    }
})

//file management
const files = document.querySelector('.files');

const showFiles = (data) => {
    let html = "";
    data.forEach(doc => {
        const file = doc.data();
        const filename = doc.data().fileName;

        /* var storage = firebase.storage();
        var pathReference = storage.ref('files/calidad/' + filename);

        console.log(pathReference); */
        var storageRef = firebase.storage().ref('');
        url = storageRef.child('files/calidad/' + filename).getDownloadURL().then((url) => {
            console.log(storageRef)
            const p = `
         <div class="files">
             <div class="data">
                 <p>Nombre de archivo: <b>${file.fileName}</b></p>
                 <p>Subido por: ${file.uploadUser}</p>
                 <p>Dia de carga: ${file.uploadDate} </p>
                 <p>Hora de carga: ${file.uploadTime} </p>
             </div>
             <div class="icon">
             <a target="_blank" href="${url}"><i class="fas fa-download fa-3x"></i></a>
             </div>
         </div>`;
            html += p;
            files.innerHTML = html
        });

    });
}

function uploadFile() {
    showModal();
    var fileButton = document.getElementById('fileButton');
    fileButton.addEventListener('change', (e) => {

        var file = e.target.files[0]

        var storageRef = firebase.storage().ref('files/calidad/' + file.name);


        console.log("Subiendo archivo: " + file.name)


        //upload file
        storageRef.put(file).then(() => {

            window.location.href = "calidad.html"
        });
        var user = firebase.auth().currentUser;
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log(date);
        db.collection('calidad').add({
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