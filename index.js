const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/coin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))

// Schema -> Model -> Document
// 스키마 정의
const coinSchema = new mongoose.Schema({
  date: { type: String },
  open: { type: String },
  high: { type: String },
  low: { type: String },
  close: { type: String },
  vol: { type: String },
  marcket_cap: { type: String },
})

const Coin = mongoose.model('costs2', coinSchema)

// const bitcoin1 = new Coin({
//   open: '2000202',
//   high: '11115151',
//   low: '1345244',
//   close: '10002300',
//   vol: '3333301130',
//   marcket_cap: '12313131',
// })
// bitcoin1
//   .save()
//   .then(() => {
//     console.log('성공')
//   })
//   .catch((err) => {
//     console.error(err)
//   })

const fields = {_id:0, greed_fear_score:0, date:0, Open:0, Low:0, Close:0, Volume:0}

Coin.find({High: { $gte: 50000}},fields,function (err, docs) {
  if (err) {
    console.log(err)
  } else {
    for(i=0; i<docs.length; i++){
      console.log(docs[i].toObject().High)
    }
  }
})
