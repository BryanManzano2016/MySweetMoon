const express = require('express')
const app = express()
let dataProductos = require('./recursos/productos.json')
let dataContactos = require('./recursos/contactos.json')

crearCors(app)

/* restful GET y POST */
app.get('/productos/:nombre', (solicitud, respuesta) => {
    console.log(new Date());
    let respuestaArreglo = []
    dataProductos.forEach((elemento, _) => {
        if (elemento.nombre.includes(solicitud.params.nombre)) {
            respuestaArreglo.push(elemento)
        }        
    })
    respuesta.send(JSON.stringify(respuestaArreglo))
});

app.get('/contactos', (solicitud, respuesta) => {
    console.log(new Date());
    respuesta.send(JSON.stringify(dataContactos))
});

app.get('/productos', (solicitud, respuesta) => {
    console.log(new Date());
    respuesta.send(JSON.stringify(dataProductos))
});

// Post
app.post("/", function (solicitud, respuesta) {
    respuesta.send("POST request to the homepage")
});

// Ejecutar servidor
app.listen(3000, () => console.log('Listening on port 3000!'))


// cruzar informacion entre dominios diferentes
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