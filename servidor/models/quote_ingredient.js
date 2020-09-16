const Sequelize = require('sequelize');
const db = require('./index');
const Quote = require('./quote');
const Ingredient = require('./ingredient');

var qIng = db.define('quote_ingredient', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    quoteId: Sequelize.INTEGER,
    ingredientId: Sequelize.INTEGER
}, {
    timestamps: false
});

Quote.hasMany(qIng);
Ingredient.hasMany(qIng);

module.exports = qIng;