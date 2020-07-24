function modoUsuario() {
    if(sessionStorage.getItem("modoUsuario") == null){
        var pregunta = prompt("Para administrador escriba el numero 1 ó cliente 0", "0")
        sessionStorage.setItem("modoUsuario", parseInt(pregunta))
        if(parseInt(pregunta) == 0){
            window.location.replace("index.html")
        } else {
            window.location.replace("panel-grafico.html")
        }
    } 
}

modoUsuario()