const mongoose = require('./indexMg');

const quoteSchema = new mongoose.Schema({
  idQuote: {
    type: Number
  },
  dateSale: {
    type: String,
  },
  nameProduct: {
    type: String,
  },
  nameEmployee: {
    type: String,
  },
})

module.exports = mongoose.model("quote", quoteSchema);