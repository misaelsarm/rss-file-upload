auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.uid);
        const welcome = document.querySelector('#welcome')
        const name = `Bienvenido <b>${user.email}</b>`
        welcome.innerHTML = name
    } else {
        console.log(user);
        window.location.href = "login.html"
    }
})