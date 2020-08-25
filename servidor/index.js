var PORT = process.env.PORT || 3000;
const express = require('express')
const app = express()
 
crearCors(app) 

var productoRouter = require('./routes/producto'); 
var contactoRouter = require('./routes/contacto'); 
var graphRouter = require('./routes/graphs');
var newRouter = require('./routes/new');
var connection = require('./models/index');

app.use('/producto', productoRouter); 
app.use('/contacto', contactoRouter); 
app.use('/graph', graphRouter); 
app.use('/new', newRouter);  

app.listen(PORT, () => console.log('Listening on port '+ PORT + '!'))

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
 

