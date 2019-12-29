const logOut = document.querySelector('#logOut');
logOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "login.html"
})