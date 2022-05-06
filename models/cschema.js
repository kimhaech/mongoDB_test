const mongoose = require('mongoose')

const coin_data_Schema = new mongoose.Schema({
  date: { type: Date },
  open: { type: String },
  high: { type: String },
  low: { type: String },
  close: { type: String },
  vol: { type: String },
  marcket_cap: { type: String },
})

const Coin = mongoose.model('Coin', coin_data_Schema)
export default Coin
