const Sequelize = require('sequelize');
const db = require('./index');
const User = require('./user');

var quote = db.define('quote', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: Sequelize.STRING,
    tamano: Sequelize.INTEGER,
    isModelo: Sequelize.BOOLEAN,
    fecha: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    isActive: Sequelize.BOOLEAN
}, {
    timestamps: false
});
User.hasMany(quote);

module.exports = quote;