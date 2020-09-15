const Sequelize = require('sequelize')
const db = require('./index')
const Rol = require('./rol')

var user = db.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true  },
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    clave: Sequelize.STRING,
    correo: Sequelize.STRING,
    rolId: Sequelize.INTEGER
}, {
    timestamps: false
})
  
Rol.hasMany(user, {foreignKey: 'rolId'})
user.belongsTo(Rol, {foreignKey: 'rolId'})

module.exports = user