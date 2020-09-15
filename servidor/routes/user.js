var express = require('express')
var sequelize = require('../models/index')
const UserModel = require('../models/user');

var router = express.Router()

router.post('/login', async (req, res, next) => {
    try {
        let requestBody = req.body
        delete requestBody.id
        let objectNew = await NewModel.create(requestBody);
        res.json(objectNew)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router
