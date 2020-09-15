var express = require('express')
var sequelize = require('../models/index')
const UserModel = require('../models/user');
const rolModel = require('../models/rol');

var router = express.Router()

router.post('/login', async (req, res, next) => {
    try {
        let requestBody = req.body
        let user = await UserModel.findOne({ where: { correo: requestBody.correo, 
            clave: requestBody.password }, attributes: { exclude: ['clave'] }, include: [rolModel]  }) 
        res.json(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router
