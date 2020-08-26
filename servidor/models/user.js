const Sequelize = require('sequelize')
const db = require('./index')
const Rol = require('./rol')

var user = db.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    clave: Sequelize.STRING,
    correo: Sequelize.STRING,
    rolId: Sequelize.INTEGER
}, {
    timestamps: false
})

Rol.hasOne(user) 

module.exports = user