var express = require('express'); 

var Producto = require("../models/producto")

var router = express.Router();

router.get('/todos', async (req, res, next) => {
    const productos = await Producto.find({})
    res.send(productos)
});


/* 
app.get('/productos', (solicitud, respuesta) => {
    imprimirRuta("/productos")
    respuesta.send(JSON.stringify(dataProductos))
})

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
*/
 
module.exports = router;