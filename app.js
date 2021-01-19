import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import nunjucks from 'nunjucks';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { userRouter } from './src/api/routers/router.js';
import routes from './src/api/routers/router.js';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

//middleware ex) 로그인 여부 체크, 파일 전송중에 upload, 접속에 대한 로그 작성, ip주소를 체크하고 접속 여부 결정.

app.use(cookieParser()); //cookie를 전달받아서 사용할 수 있도록 만들어주는 middleware입니다. 사용자 인증 등에서 쿠키를 검사할 때 필요합니다.
app.use(bodyParser.json()); //body-parser 요청본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev')); //morgan 로그를 제공하는 미들웨어
app.use(helmet()); //helmet 익스프레스에 보안을 더해주는 미들웨어

// //static 미들웨어는 정적인 파일들을 제공하는 라우터 역할,
// app.use('요청 경로', express.static('실제경로'));
// app.use('/', express.static(path.join(__dirname, 'pubilc')));

const handleHome = (req, res) => {
  res.send('Hello from Home');
};

app.get('/', handleHome);
app.use('/user', userRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port') + '번 포트에서 대기중..');
});
