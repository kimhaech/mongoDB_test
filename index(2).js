const express = require('express')
const app = express()
const port = 5000
  
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
// User model 가져오기
const { User } = require("./models/User");

// application/x-www-form-urlencoded 의 데이터를 분석하여 가져올 수 있도록 하는 것
app.use(bodyParser.urlencoded({extended: false}));
// cookie-parser 사용
app.use(cookieParser());
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

app.post('/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾기
  console.log(req.body)
  User.findOne({email: req.body.email}, (err, user) => {
    // 일치하는 이메일이 없는 경우
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 정보가 없습니다."
      });
    }
    // 요청한 이메일이 데이터베이스에 있는 경우 비밀번호가 일치하는지 체크
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      // 비밀번호가 일치하는 경우 토큰 생성
    })
    user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        
        // user안에 들어있는 토큰을 저장. 어디? 쿠키, 로컬스토리지 등 저장할 수 있음.
        // 쿠키에 저장하겠음 : cookieparser 설치 필요
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id})
      })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})