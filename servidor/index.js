var PORT = process.env.PORT || 3000
const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

crearCors(app)

var productoRouter = require('./routes/producto')
var contactoRouter = require('./routes/contacto')
var graphRouter = require('./routes/graphs')
var newRouter = require('./routes/new')
var ingredientRouter = require('./routes/ingredientes')
var galeriaRouter = require('./routes/galeria')
var imagenRouter = require('./routes/imagen')
var userRouter = require('./routes/user')
var quoteRouter = require('./routes/quote')

var adminRouter = require('./routes/adminRouter')

app.use("/admin", adminRouter)
app.use(fileUpload())

app.use('/product', productoRouter)
app.use('/contacto', contactoRouter)
app.use('/graph', graphRouter)
app.use('/galeria', galeriaRouter)
app.use('/imagen', imagenRouter) 
app.use('/new', newRouter)

app.use('/user', userRouter)

app.use('/ingrediente', ingredientRouter)

app.use('/quote', quoteRouter)  

app.listen(PORT, () => console.log('Listening on port ' + PORT + '!'))

// cruzar informacion entre dominios diferentes
function crearCors(apps) {
	apps.use((solicitud, respuesta, next) => {
		respuesta.header('Access-Control-Allow-Origin', '*')
		respuesta.header('Access-Control-Allow-Headers',
			'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
		respuesta.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
		respuesta.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
		next()
	}) 
	app.use(express.json())
} 