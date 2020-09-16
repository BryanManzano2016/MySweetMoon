var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var router = express.Router();
var Contacto = require("../models/contacto");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
  res.render('contact');
});

router.post('/send', async (req, res, next) => {
  console.log("POST /send");
  let output = `
    <p>You have a new contact request</p>
    <h3>Información de contacto</h3>
    <ul>
      <li>Nombre: ${req.body.name}</li>
      <li>Apellido: ${req.body.lastname}</li>
      <li>Email: ${req.body.email}</li>
      <li>Teléfono: ${req.body.phone}</li>
      <li>Fecha de nacimiento: ${req.body.date}</li>
    </ul>
    <h3>Mensaje</h3>
    <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'joshmoon233@gmail.com',
      pass: 'JmLg3699'
    }
  });

  let mailOptions = {
    from: 'joshmoon233@gmail.com',
    to: 'joshmoon233@gmail.com',
    subject: 'Intento de contacto',
    html: output
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.sendStatus(200);
});

router.get('/todos', async (req, res, next) => {
    res.send({})
});

module.exports = router;
