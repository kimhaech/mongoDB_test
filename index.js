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

// const fields = {
//   _id: 0,
//   Open: 0,
//   Low: 0,
//   Close: 0,
//   Volume: 0,
// }

Coin.find({}, function (err, docs) {
  if (err) {
    console.log(err)
  } else {
    // docs -> find 결과값
    // for (i = 0; i < docs.length; i++) {
    //   console.log(docs[i].toObject().date + ' : ' + docs[i].toObject().High)
    // }
    today = get_today()
    console.log('today : ' + today)

    const start_year = 2022
    const start_month = 3
    const start_day = 2
    const end_year = 2022
    const end_month = 3
    const end_day = 2

    // 각 1일전, 일주일 전, 10일 전
    const a_day_ago = get_beforedate(today[0], today[1], today[2], 1)
    const a_week_ago = get_beforedate(today[0], today[1], today[2], 7)
    const ten_days_ago = get_beforedate(today[0], today[1], today[2], 10)

    console.log(a_day_ago)
    console.log(a_week_ago)
    console.log(ten_days_ago)

    get_period_data(
      start_year,
      start_month,
      start_day,
      end_year,
      end_month,
      end_day,
      docs
    )
  }
})

// 시작 일자로 부터 h일 전의 날짜값 반환
function get_beforedate(y, m, d, h) {
  let b = d - h // 기준 일 - h일 전
  let result_date = []

  if (b < 1) {
    // b가 1보다 작은 경우 -> 전월
    if (m == 1) {
      m = 12
      y -= 1
      d = calendar[m] + b
    } else {
      m -= 1
      d = calendar[m] + b
    }
    result_date.push(y, m, d)
  } else {
    d -= h
    result_date.push(y, m, d)
  }

  return result_date
}

// start에서 end 간의 데이터 조회
function get_period_data(
  start_year,
  start_month,
  start_day,
  end_year,
  end_month,
  end_day,
  docs
) {
  yb = false
  mb = false
  end = false
  for (
    s_year = start_year, s_month = start_month, s_day = start_day;
    end != true;
    s_day++
  ) {
    if (s_year == end_year) {
      yb = true
      if (s_month == end_month) {
        mb = true
        if (s_day == end_day) {
          end = true
        }
      }
    }
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

    // docs 하나씩 조회
    for (i = 0; i < docs.length; i++) {
      if (docs[i].toObject().date === td) {
        console.log(docs[i].toObject().date + ' : ' + docs[i].toObject().High)
      }
    }
  }
}

// 오늘 날짜를 반환
function get_today() {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  let yyyy = today.getFullYear()
  today = yyyy + '-' + mm + '-' + dd

  console.log(today)
  return [yyyy, mm, dd]
}
