const express = require('express')
const app = express()
const port = 5000
  
const bodyParser = require('body-parser');

const config = require('./config/key');
// User model 가져오기
const { User } = require("./models/User");

// application/x-www-form-urlencoded 의 데이터를 분석하여 가져올 수 있도록 하는 것
app.use(bodyParser.urlencoded({extended: true}));
// application/json 타입으로 된 것을 분석하여 가져올 수 있도록 하는 것
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, async(err)=>{
  if(err) throw err;
  console.log("connected to db")
})


app.get('/', (req, res) => {
  res.send('test express so hard,,,')
})

// 회원 가입에 필요한 route
app.post('/register', (req, res) => {
  // 회원 가입에 필요한 정보들을 client에서 가져옴 --> db에 넣어줌
  const user = new User(req.body)

  //mongodb에서 오는 method(save)
  user.save((err, userInfo) => {
    // 저장 할 때 에러발생 시 json 형식으로 전달 + err : 에러 메세지
    if(err) return res.json({success: false, err})
    // 성공한경우 저장한 userInfo를 json형식으로 전달
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})