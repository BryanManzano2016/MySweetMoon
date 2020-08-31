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
    pictureId: Sequelize.INTEGER, 
    estado: Sequelize.BOOLEAN
}, {
    timestamps: false
});
 
Picture.hasMany(news, {foreignKey: 'pictureId'})
news.belongsTo(Picture, {foreignKey: 'pictureId'})

User.hasMany(news, {foreignKey: 'userId'})
news.belongsTo(User, {foreignKey: 'userId'})    

module.exports = news;