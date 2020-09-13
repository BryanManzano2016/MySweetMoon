const Sequelize = require('sequelize');
const db = require('./index');
const User = require('./user');

var picture = db.define('picture', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true  },
    url: Sequelize.STRING,
    alt: Sequelize.STRING,
    esGaleria: Sequelize.BOOLEAN
}, {
    timestamps: false
}); 

module.exports = picture;