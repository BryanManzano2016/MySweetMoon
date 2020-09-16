var express = require('express');
var router = express.Router();


router.get("/:url", async (req, res, next) => {
    let url = __dirname.replace("routes", "").replace(/\\/g, "/") + "img/" + req.params.url ;
    console.log(url);

    res.sendFile(url);
});

router.post("/", async (req, res, next) =>{
    let EDFile = req.files.file;

    EDFile.mv(`./img/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })
        return res.status(200).send({ message : 'File upload' })
    }).catch((err)=>{
        res.status(404).send({ message : 'File not upload' })});
});

module.exports = router;