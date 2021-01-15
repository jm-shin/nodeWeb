const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const nunjucks = require('nunjucks');

dotenv.config();
const authRouter = require('./api/routers/auth');
const indexRouter = require('./api/routers');
const { sqeulize } = require('./models');

const app = express();

app.set('port', process.env.PORT || 3000);
//morgan 요청과 응답에 대한 정보를 콘솔에 기록함
app.use(morgan('dev'));

//static 미들웨어는 정적인 파일들을 제공하는 라우터 역할
app.use('요청 경로', express.static('실제경로'));
app.use('/', express.static(path.join(__dirname, 'pubilc')));

//body-parser 요청본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//404 에러 핸들러
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.locals.error.status = err.status || 500;
  if (process.env.NODE_ENV === 'production') {
    delete err.stack;
  } else if (err.code === 'permission_denied') {
    res.status(403).send('Forbidden');
  } else if (err.code === 'permission_not_found') {
    res.status(403).send('Could not find permissions for user. Bad configuration.');
  } else if (err.code === 'user_object_not_find') {
    res.status(403).send('user object "user" was not found. Check your configuration.');
  }
});

// res.locals.title = 'Error';
// console.log(err);

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', (req, res) => {
  res.send('Hello node!');
});
