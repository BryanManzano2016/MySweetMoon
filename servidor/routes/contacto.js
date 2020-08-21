var express = require('express'); 

var Contacto = require("../models/contacto")
var router = express.Router();

router.get('/todos', async (req, res, next) => {
    res.send({})
});

module.exports = router;