const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))

// Schema -> Model -> Document
// 스키마 정의
const coinSchema = new mongoose.Schema({
  date: { type: Date },
  open: { type: String },
  high: { type: String },
  low: { type: String },
  close: { type: String },
  vol: { type: String },
  marcket_cap: { type: String },
})

const Coin = mongoose.model('ctestdata', coinSchema)

const bitcoin1 = new Coin({
  date: 2022 - 12 - 01,
  open: '2000202',
  high: '11111111',
  low: '13452',
  close: '1000000',
  vol: '3333303030',
  marcket_cap: '11313131',
})
bitcoin1
  .save()
  .then(() => {
    console.log('성공')
  })
  .catch((err) => {
    console.error(err)
  })
