var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var router = express.Router();
var Contacto = require("../models/contact");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const jwtSecurity = require('../configs/jwtAuth')

router.get('/', async (req, res, next) => {
    res.render('contact');
});

router.get('/all', jwtSecurity.authenticateJWT,  async (req, res, next) => {
    try {
        const contacts = await Contacto.findAll()
        res.json(contacts);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/send', jwtSecurity.authenticateJWT, async(req, res, next) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Información de contacto</h3>
    <ul>
      <li>Nombre: ${req.body.name}</li>
      <li>Apellido: ${req.body.lastname}</li>
      <li>Celular: ${req.body.email}</li>
      <li>Email: ${req.body.phone}</li>
      <li>Fecha de nacimiento: ${req.body.date}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'correodepruebasMSM@gmail.com',
    pass: 'correo16101998'
  }
});

var mailOptions = {
  from: 'correodepruebasMSM@gmail.com',
  to: 'correodepruebasMSM@gmail.com',
  subject: 'Intento de contacto',
  text: 'Espero que esto funcione',
  //aqui deberia ir html: output pero no me funciona :(
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

router.get('/todos', jwtSecurity.authenticateJWT, async (req, res, next) => {
    res.send({})
});

module.exports = router;
