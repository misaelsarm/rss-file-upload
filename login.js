//login form
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const userEmail = cred.user.email;
        alert("Bienvenido " + userEmail)
        window.location.href = "index"
    })
})

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "index"

    } else {

        //window.location.href = "login.html"
        // window.location.replace = "login.html"
        console.log(user);
    }
})