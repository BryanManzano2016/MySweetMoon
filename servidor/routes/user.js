var express = require('express') 
const UserModel = require('../models/user')
const rolModel = require('../models/rol')

const jwtSecurity = require('../configs/jwtAuth') 

var router = express.Router()

router.post('/login', async (req, res, next) => {
    console.log(req.body);
    try {
        let requestBody = req.body
        let user = await UserModel.findOne({
            where: {
                correo: requestBody.correo,
                clave: requestBody.password
            }, attributes: { exclude: ['clave'] }, include: [rolModel]
        })
        res.json({
            user: user, token: jwtSecurity.jwt.sign({ username: user.correo, role: user.rolId },
                jwtSecurity.keySecret)
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router
