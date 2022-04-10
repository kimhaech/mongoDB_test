// 몽구스 연결 
const mongoose = require('mongoose') 

// 유저스키마 작성 
const userSchema = mongoose.Schema({ 
  // 하나하나의 필드 작성

  // 이름 
  name: { 
    type: String, 
    maxlength: 50 
  }, 
  // 이메일 trim은 이메일의 빈칸을 없애는(ex. input: john ann@naver.com --> johnann@naver.com), unique 똑같은 이메일을 사용하지 못하게
  email: { 
    type: String, 
    trim: true, 
    unique: 1 
  }, 
  // 비밀번호 
  password: { 
    type: String, 
    maxlength: 15 
  }, 
  // 마지막 이름 
  lastname: { 
    type: String, 
    maxlength: 50 
  }, 
  // 관리자인지 아닌지 확인하기 위한 룰 
  role: { 
    type: Number, 
    default: 0 
  }, 
  // 이미지 
  image: String, 
  // 토큰 
  token: { 
    type: String 
  }, 
  // 토큰 유효기간 
  tokenExp: { 
    type: Number 
  } 
})

// 스키마를 모델로 감싸주기 
const User = mongoose.model('User', userSchema) 
// 다른곳에서 쓸 수 있도록 익스폴트 
module.exports = { User }