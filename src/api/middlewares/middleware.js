import routes from '../routers/router';

export const localsMiddleware = (req, res, next) => {
  //이 속성은 요청 경로 이름, 인증 된 사용자, 사용자 설정 등과 같은 요청 수준 정보를 노출하는데 유용함.
  res.locals.siteName = 'WeTube'; //res.locals 요청범위가 지정된 응답지역 변수를 포함하므로 해당 요청 / 렌더링된 보기에서만 사용할수 있는 개체임.
  res.locals.routes = routes;
  next();
};
