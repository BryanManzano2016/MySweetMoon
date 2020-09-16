reiniciarCredenciales()     

$("#formularioLogin").submit(function (e) {
    e.preventDefault();
    postFetch("http://localhost:3000/user/login", {
        correo: $("#correoCampo").val(), password: $("#passwordCampo").val()
    }).then((res) => {
        if (res) { 
            sessionStorage.setItem("usuario", res.user.nombre)
            sessionStorage.setItem("rol", res.user.rolId)
            sessionStorage.setItem("token", res.token)
            if(res.user.rolId == "2") {
                location.replace("index.html")
            } else {
                location.replace("recursos.html")
            }
        } else {            
            Swal.fire('Credenciales erroneas')
            reiniciarCredenciales();      
        }
    })
});

$("#enviarLogin").submit(function (e) {
    e.preventDefault(); 
});

function reiniciarCredenciales() {
    sessionStorage.setItem("usuario", null);
    sessionStorage.setItem("rol", null);
    sessionStorage.setItem("token", null);
}

async function postFetch(url = "", objectoEnviar = {}) {
    let response = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(objectoEnviar),
            headers: { 'Content-Type': 'application/json' }
        }
    )
    var data = await response.json()
    return data
}
 