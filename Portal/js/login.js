sessionStorage.setItem("usuario", null)
sessionStorage.setItem("rol", null)

$("#formularioLogin").submit(function (e) {
    e.preventDefault();
    postFetch("http://localhost:3000/user/login", {
        correo: $("#correoCampo").val(), password: $("#passwordCampo").val()
    }).then((res) => {
        if (res) { 
            sessionStorage.setItem("usuario", res.nombre)
            sessionStorage.setItem("rol", res.rolId)
            if(res.rolId == "2") {
                location.replace("index.html")
            } else {
                location.replace("recursos.html")
            }
        } else {            
            Swal.fire('Credenciales erroneas')
            sessionStorage.setItem("usuario", null)
            sessionStorage.setItem("rol", null)
        }
    })
});

$("#enviarLogin").submit(function (e) {
    e.preventDefault(); 
});

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
 