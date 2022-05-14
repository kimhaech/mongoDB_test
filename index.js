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

// 각 월별 일자
const calendar = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
}
// Coin의 모델 costs
const Coin = mongoose.model('costs', coinSchema)

const fields = {
  _id: 0,
  date : 1,
  greed_fear_score: 1,
  Open: 0,
  High: 1,
  Low: 0,
  Close: 0,
  Volume: 0,
}

const start_year = 2021
const start_month = 3
const start_day = 1
const end_year = 2021
const end_month = 5
const end_day = 31

Coin.find({}, fields, function (err, docs) {
  if (err) {
    console.log(err)
  } else {
    // docs -> find 결과값
    const start_year = 2021
    const start_month = 2
    const start_day = 5
    const end_year = 2021
    const end_month = 2
    const end_day = 5

    for (i = 0; i < docs.length; i++) {
      for (
        s_year = start_year, s_month = start_month, s_day = start_day;
        s_year <= end_year && s_month <= end_month && s_day <= end_day;
        s_day++
      ) {
        let td = ''
        if (s_month < 10) {
          td = s_year.toString().concat('-0', s_month.toString())
        } else {
          td = s_year.toString().concat('-', s_month.toString())
        }

        if (s_day < 10) {
          td = td.concat('-0', s_day.toString())
        } else {
          td = td.concat('-', s_day.toString())
        }
        if (s_day === calendar[s_month]) {
          s_day = 1
          s_month++
        }

        if (s_month === 13) {
          s_month = 1
          s_year++
        }

        if (docs[i].toObject().date === td) {
          console.log(docs[i].toObject().date + ' : ' + docs[i].toObject().High)
        }
      }
    }
  }
})

// function get_period_data(
//   start_year,
//   start_month,
//   start_day,
//   end_year,
//   end_month,
//   end_day
// ) {
//   for (
//     s_year = start_year, s_month = start_month, s_day = start_day;
//     s_year === end_year && s_month === end_month && s_day === end_day;
//     s_day++
//   ) {
//     if (s_day === calendar[s_month]) {
//       s_day = 1
//       s_month++
//     }
//     if (s_month === 12) {
//       s_month = 1
//       s_year++
//     }
//   }
// }

// if (day > 9) {
//   // 10 이상 day
//   let temp = year.concat('-', month).concat('-', day.toString())
// } else {
//   // 10 미만 day
//   let temp = year.concat('-', month).concat('-0', day.toString())
// }
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