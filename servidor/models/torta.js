const Sequelize = require('sequelize');
const db = require('./index');

var torta = db.define('torta', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    tamano: Sequelize.STRING,
    masa: Sequelize.STRING,
    relleno: Sequelize.STRING,
    cubierta: Sequelize.STRING,
    topping: Sequelize.STRING,
}, {
    timestamps: false
});

module.exports = ingredient;
