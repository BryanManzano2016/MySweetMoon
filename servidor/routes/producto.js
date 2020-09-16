const express = require('express') 
var ProductModel = require("../models/product")
const FigureModel = require("../models/Picture")
const jwtSecurity = require('../configs/jwtAuth')

var router = express.Router();

router.get('/all', jwtSecurity.authenticateJWT, async (req, res, next) => {
    const productos = await ProductModel.findAll({ include: [FigureModel] })
    res.send(productos)
})
  
router.post('/save', jwtSecurity.authenticateJWT, async (req, res, next) => {
    try {
        let requestBody = req.body
        delete requestBody.id
        let objectNew = await ProductModel.create(requestBody);
        res.json(objectNew)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.put('/update', jwtSecurity.authenticateJWT, async (req, res, next) => {
    try {
        let requestBody = req.body
        let objectNew = await ProductModel.findOne({ where: { id: requestBody.id } })
        objectNew.nombre = requestBody.nombre
        objectNew.caracteristicas = requestBody.caracteristicas
        await objectNew.save()
        res.json(objectNew)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.delete('/delete/:id', jwtSecurity.authenticateJWT, async (req, res, next) => {
    try {

        let objectNew = await ProductModel.findOne({ where: { id: req.params.id } })
        await objectNew.destroy()
        res.json(objectNew)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

module.exports = router;