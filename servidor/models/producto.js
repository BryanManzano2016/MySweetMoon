var mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  identificador: {
    type: Number
  },
  nombre: {
    type: String,
  },
  precio: {
    type: Number,
  },
  id_foto: {
    type: Number,
  },
});

module.exports = mongoose.model("producto", productoSchema);
