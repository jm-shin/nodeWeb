const passport = require('passport');
const local = require('passport-local');
const kakao = require('passport-kakao');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    //serializeUser : 로그인시 실행, req,session에 어떤 데이터를 저장할지 정하는 메서드.
    done(null, user.id); //null은 에러발생 시 사용, 두번째 인수는 저장할 데이터.
  });

  passport.deserializeUser((id, done) => {
    //deserializeUser 매요청시 실행
    User.findOne({ where: id })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
};
