//로그인, 회원가입 router
import { home, search } from '../../controllers/videoController';
import express from 'express';
import routes from './router';

const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, (req, res) => {
  res.send('join');
});
globalRouter.get(routes.login, (req, res) => {
  res.send('login');
});
globalRouter.get(routes.logout, (req, res) => {
  res.send('logout');
});
globalRouter.get(routes.search, (req, res) => {
  res.send('search');
});

export default globalRouter;
