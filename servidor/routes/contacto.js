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

router.get('/all', jwtSecurity.authenticateJWT, async (req, res, next) => {
  try {
    const contacts = await Contacto.findAll()
    res.json(contacts);
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/send', async (req, res, next) => {
  console.log("\nPOST contacto/send");

  const output = `
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
      res.sendStatus(500);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  const contacts = await Contacto.create({
    id: 0,
    nombre: req.body.name,
    apellido: req.body.lastname,
    celular: req.body.phone,
    correo: req.body.email,
    mensaje: req.body.message,
    fecha: req.body.date,
    userId: 1
  }).then((result) => {
    res.sendStatus(200);
  }).catch((err) => {
    console.error(err);
    res.sendStatus(404);
  });


});

router.get('/todos', jwtSecurity.authenticateJWT, async (req, res, next) => {
  res.send({})
});

module.exports = router;
