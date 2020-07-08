const express = require('express')
const app = express()
let data = require('./productos.json')

crearCors(app)

app.get('/productos/:nombre', (solicitud, respuesta) => {
    console.log(new Date());
    let respuestaArreglo = []
    data.forEach((elemento, _) => {
        if (elemento.nombre.includes(solicitud.params.nombre)) {
            respuestaArreglo.push(elemento)
        }        
    })
    respuesta.send(JSON.stringify(respuestaArreglo))
});

app.post("/", function (solicitud, respuesta) {
    respuesta.send("POST request to the homepage")
});

app.listen(3000, () => console.log('Listening on port 3000!'))





function crearCors(app) {
	app.use((solicitud, respuesta, next) => {
		respuesta.header('Access-Control-Allow-Origin', '*');
		respuesta.header('Access-Control-Allow-Headers', 
			'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
		respuesta.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
		respuesta.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
		next();
	});
}