// 몽구스 연결 
const mongoose = require('mongoose') 

const bcrypt = require('bcrypt');
// 10개의 salt로 암호화하겠다.
const saltRounds = 10

const jwt = require('jsonwebtoken');
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
    maxlength: 100 
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

userSchema.pre('save', function(next) {
  var user = this;
  // 비밀번호를 암호화 시킴

  // 비밀번호가 변경 될때만 암호화
  if(user.isModified('password')){
  // salt를 통해서 암호화
    bcrypt.genSalt(saltRounds,function(err, salt){
      if(err) return next(err);

      // 1arg : 입력한 암호값(plainpassword)
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        // err X hash 된(암호화된) 비밀번호로 변경
        user.password = hash
        next()
      })
    })
  } else {  // 변경하지 않는 경우 그대로 실행
    next()
  }
})

userSchema.methods.comparePassword = function(plainpassword, cb) {
  // plainPassword 1234567 암호화된 비밀번호 $2b$10$Ya8VcIHLwvnrwHTZg0WlIeOVHileSPe9TNZMfqZ9yncSMlJRTKrYe
  bcrypt.compare(plainpassword, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  var user = this;
  // jsonwebtoken을 이용해서 token을 생성
  var token = jwt.sign(user._id.toHexString(), 'secretToken')// db상 id 가져오기

  user.token = token
  user.save(function(err, user){
    if(err) return cb(err);
    cb(null, user)
  })
}
// 스키마를 모델로 감싸주기 
const User = mongoose.model('User', userSchema) 

// 다른곳에서 쓸 수 있도록 익스폴트 
module.exports = { User }