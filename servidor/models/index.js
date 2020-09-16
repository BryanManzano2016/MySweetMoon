const Sequelize = require('sequelize');

var sequelize = new Sequelize('mysweetmoondb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log("DB MySweetMoon connection succesful!");
    }).catch(err => {
        console.error.bind(console, 'MySQL connection error:')
    });

module.exports = sequelize; 