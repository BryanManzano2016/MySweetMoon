var express = require('express');
var router = express.Router();
var Pictures = require('../models/picture');

router.get("/", async (req, res, next) => {
    console.log("GET picture" + req.url);

    Pictures.findAll({
        where: {
            esGaleria: true
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.sendStatus(404);
    })
});

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;

    Pictures.findAll({
        where: {
            id: id,
            esGaleria: true
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.sendStatus(404);
    });
});

router.post('/', async (req, res, next) => {
    let url = req.body.url;
    let alt = req.body.alt;

    console.log("POST  Picture url: " + url + " alt: " + alt);
    Pictures.create({
        id: 0,
        url: url,
        alt: alt,
        esGaleria: true
    }).then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.error(err);
        res.sendStatus(404);
    });
});

router.put('/:id', async (req, res, next) => {

    let id = req.params.id;
    let alt = req.body.alt;
    console.log("\nSe modifica '" + id + "'")
    console.log("A alt: " + alt);

    Pictures.update(
        {
            alt: alt
        },
        {
            where: {
                id: id
            }
        }
    ).then(function (rowsUpdated) {
        res.status = 200;
        res.send(rowsUpdated);
    })
        .catch(next => {
            console.log(next);
            res.sendStatus(404);
        });
});

router.delete('/:id', async (req, res, next) => {
    let id = req.params.id;
    console.log("\nDELETE picture id: " + id);

    Pictures.destroy({
        where: {
            id: id
        },
        force: true
    }).then(function (rowsUpdated) {
        res.sendStatus(200);
    })
        .catch(next => {
            console.log(next);
            res.sendStatus(404);
        });
});

module.exports = router;