//logout
const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "login"
})

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.email);
        const welcome = document.querySelector('#welcome')
        const name = `Bienvenido <b>${user.email}</b>`
        welcome.innerHTML = name
    } else {
        console.log(user);
        window.location.href = "login"
    }
})