var mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String
  },
  apellido: {
    type: String,
  },
  celular: {
    type: String,
  },
  correo: {
    type: String,
  },
  mensaje: {
    type: String,
  },
  fecha: {
    type: Date,
  },
  id_usuario: {
    type: Number,
  }
});

module.exports = mongoose.model("contacto", contactoSchema);
