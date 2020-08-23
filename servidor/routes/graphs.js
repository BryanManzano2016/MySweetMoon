var express = require('express');
var router = express.Router();
var sequelize = require('../models/index');
var Ingredientes = require('../models/ingredient');
var QIng = require('../models/quote_ingredient');

router.get('/:id', async (req, res, next) => {
    console.log("GET graph" + req.url);
    let id = req.params.id;

    if (id == 1) {
        getGraph1(res);
    } else if (id == 2) {
        getGraph2(res);
    } else if (id == 3){
        getGraph3(res);
    }else {
        res.sendStatus(404);
    }
});

function getGraph1(res) {
    let query = "SELECT  quotes.tamano, ing.nombre, count(ing.id) as count" +
        " FROM quote_ingredients AS qi, quotes, ingredients AS ing " +
        " WHERE qi.quoteId = quotes.id and qi.ingredientId = ing.id and ing.tipo = 'Masa'" +
        " GROUP BY quotes.tamano, ing.nombre;"

    sequelize.query(query)
        .then(ingredients => {
            let tamaños = []
            let masas = [];

            for (let ing of ingredients[0]) {
                let tamaño = ing.tamano;
                let masa = ing.nombre;
                if (!tamaños.includes(tamaño)) {
                    tamaños.push(tamaño);
                } if (!masas.includes(masa)) {
                    masas.push(masa);
                }
            }

            let result = {};
            for (let tamaño of tamaños) {
                let elements = {}
                for (let masa of masas) {
                    elements[masa] = 0;
                }
                result[tamaño] = elements;
            }

            for (let ing of ingredients[0]) {
                let tamaño = ing.tamano;
                let masa = ing.nombre;
                result[tamaño][masa] = parseInt(ing.count);
            }

            res.send(result);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

function getGraph2(res) {
    Ingredientes.findAll({
        include: QIng,
        where: {
            tipo: 'Relleno'
        }
    }).then(data => {
        result = {};

        for (let ing of data) {
            let element = {}
            result[ing.nombre] = parseInt(ing.quote_ingredients.length);
        }
        console.log(result);
        res.send(result);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
}

function getGraph3(res) {
    let query = "SELECT YEAR(fecha) as year, MONTH(fecha) as month, count(quotes.id) as count" +
        " FROM quotes GROUP BY YEAR(fecha), MONTH(fecha) limit 10;"

    sequelize.query(query)
        .then(dates => { 
            let d = new Date();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();
            let i = 10;
        
            let result = {};
            result[year] = {};
            while (i > 0) {
                if (month == 0) {
                    year -= 1;
                    month = 12;
                    result[year] = {};
                } else {
                    result[year][month] = 0;
                    month -= 1;
                    i -= 1;
                }
            }
            
            for(let data of dates[0]){
                result[data["year"]][data["month"]] = data["count"];
            }

            res.send(result);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
}

module.exports = router;