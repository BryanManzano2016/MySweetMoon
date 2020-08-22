const Sequelize = require('sequelize');
const db = require('./index');

var picture = db.define('picture', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    url: Sequelize.STRING,
    alt: Sequelize.STRING,
    userId: Sequelize.BOOLEAN
}, {
    timestamps: false
});

module.exports = picture;