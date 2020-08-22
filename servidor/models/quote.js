const Sequelize = require('sequelize');
const db = require('./index');
const User = require('./user');

var quote = db.define('quote', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    nombre: Sequelize.STRING,
    tamano: Sequelize.INTEGER,
    isModelo: Sequelize.BOOLEAN,
    fecha: Sequelize.DATE,
    userId: Sequelize.INTEGER
}, {
    timestamps: false
});
User.hasMany(quote);

module.exports = quote;