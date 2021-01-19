/*global */
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

/*users */
const USER = '/user';
const USER_DETAIL = '/:id'; //express는 : 부분은 변수로 처리함.
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';

/*videos */
const VIDEOS = '/videos';
const UPLOAD_VIDEO = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: USER_DETATIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  uploadVideos: UPLOAD_VIDEO,
  videoDetail: VIDEO_DETAIL,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
};

export default routes;
