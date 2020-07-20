function modoUsuario() {
    if(sessionStorage.getItem("modoUsuario") == null){
        var pregunta = prompt("Para administrador escriba el numero 1 ó cliente 0", "0")
        sessionStorage.setItem("modoUsuario", parseInt(pregunta))
    } 
}

modoUsuario()