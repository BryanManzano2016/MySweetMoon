const Sequelize = require('sequelize');
const db = require('./index');


var rol = db.define('rol', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    rol: Sequelize.STRING
}, {
    timestamps: false
});

module.exports = rol;