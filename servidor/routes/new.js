var express = require('express')
var sequelize = require('../models/index')

const NewModel = require("../models/new")
const FigureModel = require("../models/Picture")
const UserModel = require('../models/user');

var router = express.Router()

router.get('/todos', async (req, res, next) => {
    try {
        const news = await NewModel.findAll({ include: [FigureModel] })
        res.json(news);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const news = await NewModel.findOne({ where: {id: req.params.id }, 
            include: [FigureModel, {model: UserModel, attributes: {exclude: ['clave']} }] 
        })
        res.json(news);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router
 