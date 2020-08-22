const Sequelize = require('sequelize');
const db = require('./index');
const User = require('./user');

var contact = db.define('contact', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    celular: Sequelize.STRING,
    correo: Sequelize.STRING,
    mensaje: Sequelize.STRING,
    fecha: Sequelize.DATE,
    userId: Sequelize.INTEGER
}, {
    timestamps: false
});
User.hasMany(contact);

module.exports = contact;