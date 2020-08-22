const Sequelize = require('sequelize');
const db = require('./index');
const User = require('./user');
const Picture = require('./picture');

var news = db.define('new', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    titulo: Sequelize.STRING,
    subtitulo: Sequelize.STRING,
    contenido: Sequelize.STRING,
    fecha: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    pictureId: Sequelize.INTEGER
}, {
    timestamps: false
});
User.hasMany(news);
Picture.hasOne(news);

module.exports = news;