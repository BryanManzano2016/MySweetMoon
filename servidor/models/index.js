var mongoose = require('mongoose');
var Producto = require('./producto')
var Contacto = require('./contacto')

DATABASE_URL = "mongodb://localhost:27017/my_sweet_moon"

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connnection successful!'))
    .catch(err => {
        console.error.bind(console, 'MongoDB connection error:')
    });

const Sequelize = require('sequelize');

var sequelize = new Sequelize('mysweetmoondb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log("DB MySweetMoon connection succesful!");
    }).catch(err => {
        console.error.bind(console, 'MySQL connection error:')
    });

module.exports = sequelize;