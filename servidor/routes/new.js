var express = require('express')
var sequelize = require('../models/index')

const NewModel = require("../models/new")
const FigureModel = require("../models/Picture")
const UserModel = require('../models/user');

var router = express.Router()

router.get('/todos', async (req, res, next) => {
    try {
        const news = await NewModel.findAll({ where: { estado: true }, include: [FigureModel] })
        res.json(news);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const news = await NewModel.findOne({
            where: { id: req.params.id, estado: true },
            include: [FigureModel, { model: UserModel, attributes: { exclude: ['clave'] } }]
        })
        res.json(news);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/guardarNoticia', async (req, res, next) => {
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

router.put('/modificarNoticia', async (req, res, next) => {
    try {
        let requestBody = req.body
        let objectNew = await NewModel.findOne({ where: { id: requestBody.id } })
        objectNew.titulo = requestBody.titulo
        objectNew.subtitulo = requestBody.subtitulo
        objectNew.contenido = requestBody.contenido
        await objectNew.save()
        res.json(objectNew)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.delete('/borrarNoticia/:id', async (req, res, next) => {
    try {
        let objectNew = await NewModel.findOne({ where: { id: req.params.id } })
        objectNew.estado = false
        await objectNew.save()
        res.json(objectNew)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router
