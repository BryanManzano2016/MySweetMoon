const Sequelize = require('sequelize');
const db = require('./index');
const Picture = require('./picture');

var product = db.define('product', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: Sequelize.STRING,
    caracteristicas: Sequelize.STRING,
    pictureId: Sequelize.INTEGER
}, {
    timestamps: false
});

Picture.hasOne(product);

module.exports = product;