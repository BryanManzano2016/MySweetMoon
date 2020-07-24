function modoUsuario() {
    if(sessionStorage.getItem("modoUsuario") == null){
        var pregunta = prompt("Para administrador escriba el numero 1 ó cliente 0", "0")
        sessionStorage.setItem("modoUsuario", parseInt(pregunta))
        if(parseInt(pregunta) == 0){
            window.location.assign("index.html")
        } else {
            window.location.assign("recursos.html");
        }
    } 
}

modoUsuario()