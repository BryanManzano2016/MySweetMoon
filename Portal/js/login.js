$("#formularioLogin").submit(function (e) {
    e.preventDefault();
    postFetch("http://localhost:3000/user/login", {
        correo: $("#correoCampo").val(), password: $("#passwordCampo").val()
    }).then((res) => {
        console.log(res);
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