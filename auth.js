auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('files').orderBy("uploadTime", "desc").get().then(snapshot => {
            showFiles(snapshot.docs);
        })

        //var dateTime = date + ' ' + time;
        console.log(user.email);
        //console.log(dateTime);
        const welcome = document.querySelector('#welcome')
        const name = `Bienvenido <b>${user.email}</b>`
        welcome.innerHTML = name


    } else {
        console.log(user);
        window.location.href = "login.html"
    }
})

const files = document.querySelector('.files');
console.log(files)

const showFiles = (data) => {
    let html = "";
    data.forEach(doc => {
        const file = doc.data();
        const filename = doc.data().fileName;
        console.log(filename)
        var storageRef = firebase.storage().ref('');
        url = storageRef.child('files/compras/' + filename).getDownloadURL().then((url) => {

            const p = `
        <div class="files">
            <p>Nombre de archivo: <b><a target="_blank" href="${url}">${file.fileName}</a></p></b>
            <p>Subido por: ${file.uploadUser}</p>
            <p>Dia de carga: ${file.uploadDate} </p>
            <p>Fecha de carga: ${file.uploadTime} </p>
            <p>URL: ${url} </p>
        </div>`;
            html += p;
            files.innerHTML = html
            console.log(url);
        });

    });
}

function showModal() {


    document.getElementById("modal").style.transform = "scale(1,1)";
    document.getElementById("overlay").style.opacity = "0.5";
    document.getElementById("overlay").style.zIndex = "100";
    var fileButton = document.getElementById('fileButton');
    fileButton.addEventListener('change', (e) => {
        document.getElementById("modal").style.transform = "scale(0,0)";
        document.getElementById("overlay").style.opacity = "0";
        document.getElementById("overlay").style.zIndex = "-10";
        var file = e.target.files[0]
            //console.log(file)
            //create a storage ref
        var storageRef = firebase.storage().ref('files/compras/' + file.name);

        //upload file
        storageRef.put(file).then(() => {


        });
        var user = firebase.auth().currentUser;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        db.collection('files').add({
                fileName: file.name,
                uploadUser: user.email,
                uploadDate: date,
                uploadTime: time,
            })
            //get file

    })
    let cancelar = document.getElementById("cancelar").addEventListener('click', function() {

        document.getElementById("modal").style.transform = "scale(0,0)";
        document.getElementById("overlay").style.opacity = "0";
        document.getElementById("overlay").style.zIndex = "-10";
    });

    /* let aceptar = document.getElementById("aceptar").addEventListener('click', function() {
        document.getElementById("modal").style.transform = "scale(0,0)";
        document.getElementById("overlay").style.opacity = "0";
        document.getElementById("overlay").style.zIndex = "-10";
    }) */


}

const cargar = document.querySelector('#cargar');
cargar.addEventListener('click', showModal)