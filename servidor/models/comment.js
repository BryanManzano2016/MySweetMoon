const Sequelize = require('sequelize');
const db = require('./index');
const User = require('./user');
const News = require('./new');

var comment = db.define('comment', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    mensaje: Sequelize.STRING,
    fecha: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    newId: Sequelize.INTEGER
}, {
    timestamps: false
});

User.hasMany(comment);
News.hasMany(comment);

module.exports = comment;