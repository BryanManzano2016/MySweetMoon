const express = require('express')
const app = express()
let dataProductos = require('./recursos/productos.json')
let dataContactos = require('./recursos/contactos.json')
let dataPasos = require('./recursos/pasos.json');
const fs = require('fs');

crearCors(app)

/* restful GET y POST */
app.get('/productos/:nombre', (solicitud, respuesta) => {
    imprimirRuta("/productos/:nombre")
    let respuestaArreglo = []
    dataProductos.forEach((elemento, _) => {
        const regexp = new RegExp(`${solicitud.params.nombre}`, 'gi')
        if (elemento.nombre.search(regexp) != -1) {
            respuestaArreglo.push(elemento)
        }        
    })
    respuesta.send(JSON.stringify(respuestaArreglo))
})

app.get('/contactos', (solicitud, respuesta) => {
    imprimirRuta("/contactos")
    respuesta.send(JSON.stringify(dataContactos))
})

app.get('/productos', (solicitud, respuesta) => {
    imprimirRuta("/productos")
    respuesta.send(JSON.stringify(dataProductos))
})

app.get('/pasos', (solicitud, respuesta) => {
    imprimirRuta("/pasos")
    respuesta.send(JSON.stringify(dataPasos));
})

// Post
app.post("/", function (solicitud, respuesta) {
    console.log(solicitud.body);
    respuesta.send("POST request to the homepage")
})

app.post('/contactos',function (solicitud, respuesta) {
    console.log(solicitud.body);

    let rawdata = fs.readFileSync('./recursos/contactos.json');
    let contactoFile = JSON.parse(rawdata);
    console.log(contactoFile);
    contactoFile.push(solicitud.body);
    console.log(contactoFile);

    let data = JSON.stringify(contactoFile);
    fs.writeFileSync('./recursos/contactos.json', data);
    respuesta.send("Success!");
})

// Ejecutar servidor
app.listen(3000, () => console.log('Listening on port 3000!'))


// cruzar informacion entre dominios diferentes
function crearCors(app) {
	app.use((solicitud, respuesta, next) => {
		respuesta.header('Access-Control-Allow-Origin', '*')
		respuesta.header('Access-Control-Allow-Headers', 
			'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
		respuesta.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
		respuesta.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
		next()
    });
    app.use(express.json());
}

function imprimirRuta(valor){
    console.log(valor)
    console.log(new Date())
}