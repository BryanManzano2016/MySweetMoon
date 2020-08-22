const Sequelize = require('sequelize');
const db = require('./index');

var ingredient = db.define('ingredient', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    nombre: Sequelize.STRING,
    precio: Sequelize.FLOAT,
    tipo: Sequelize.STRING,
}, {
    timestamps: false
});

module.exports = ingredient;