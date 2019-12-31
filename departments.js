auth.onAuthStateChanged(user => {
    if (user) {
        if (user.email === "lesly.cruz@rssorting.com") {
            compras();
        }
        if (user.email === "miguel.torres@rssorting.com" || user.email === "julio.torres@rssorting.com") {
            direccion();
        }
        if (user.email === "jessica.s@rssorting.com") {
            auditoria();
        }
        if (user.email === "proyectos@rssorting.com") {
            proyectos();
        }
        if (user.email === "fany@rssorting.com") {
            rh();
        }
        if (user.email === "jaime@rssorting.com") {
            sistemas();
        }
        if (user.email === "fernando@rssorting.com") {
            sgc();
        }



        const welcome = document.querySelector('#welcome')
        const name = `Bienvenido <b>${user.email}</b>`
        welcome.innerHTML = name

    } else {
        window.location.href = "login.html"
    }
})

function compras() {
    document.getElementById("proyectos").style.display = "none"
    document.getElementById("calidad").style.display = "none"
    document.getElementById("rh").style.display = "none"
    document.getElementById("sistemas").style.display = "none"
    document.getElementById("alta-direccion").style.display = "none"
    document.getElementById("sgc").style.display = "none"
    document.getElementById("auditoria-interna").style.display = "none"
}

function calidad() {
    document.getElementById("proyectos").style.display = "none"
    document.getElementById("compras").style.display = "none"
    document.getElementById("rh").style.display = "none"
    document.getElementById("sistemas").style.display = "none"
    document.getElementById("alta-direccion").style.display = "none"
    document.getElementById("sgc").style.display = "none"
    document.getElementById("auditoria-interna").style.display = "none"
}

function auditoria() {
    document.getElementById("proyectos").style.display = "none"
    document.getElementById("calidad").style.display = "none"
    document.getElementById("rh").style.display = "none"
    document.getElementById("sistemas").style.display = "none"
    document.getElementById("alta-direccion").style.display = "none"
    document.getElementById("sgc").style.display = "none"
    document.getElementById("compras").style.display = "none"
}

function direccion() {
    document.getElementById("proyectos").style.display = "none"
    document.getElementById("calidad").style.display = "none"
    document.getElementById("rh").style.display = "none"
    document.getElementById("sistemas").style.display = "none"
    document.getElementById("compras").style.display = "none"
    document.getElementById("sgc").style.display = "none"
    document.getElementById("auditoria-interna").style.display = "none"
}

function sistemas() {
    document.getElementById("proyectos").style.display = "none"
    document.getElementById("calidad").style.display = "none"
    document.getElementById("rh").style.display = "none"
    document.getElementById("compras").style.display = "none"
    document.getElementById("alta-direccion").style.display = "none"
    document.getElementById("sgc").style.display = "none"
    document.getElementById("auditoria-interna").style.display = "none"
}

function rh() {
    document.getElementById("proyectos").style.display = "none"
    document.getElementById("calidad").style.display = "none"
    document.getElementById("compras").style.display = "none"
    document.getElementById("sistemas").style.display = "none"
    document.getElementById("alta-direccion").style.display = "none"
    document.getElementById("sgc").style.display = "none"
    document.getElementById("auditoria-interna").style.display = "none"
}

function sgc() {
    document.getElementById("proyectos").style.display = "none"
    document.getElementById("calidad").style.display = "none"
    document.getElementById("rh").style.display = "none"
    document.getElementById("sistemas").style.display = "none"
    document.getElementById("alta-direccion").style.display = "none"
    document.getElementById("compras").style.display = "none"
    document.getElementById("auditoria-interna").style.display = "none"
}


function proyectos() {
    document.getElementById("compras").style.display = "none"
    document.getElementById("calidad").style.display = "none"
    document.getElementById("rh").style.display = "none"
    document.getElementById("sistemas").style.display = "none"
    document.getElementById("alta-direccion").style.display = "none"
    document.getElementById("sgc").style.display = "none"
    document.getElementById("auditoria-interna").style.display = "none"
}