import RouterConstants from "./app.constants";

export default class ApiRouterConstants {
  // API routers path
  static BASE_URL = RouterConstants.API_URL;
  static SIGN_IN_API= `${this.BASE_URL}/sessions/signin`;
  static SIGN_UP_API = `${this.BASE_URL}/users`;
  static VIDEO_API = `${this.BASE_URL}/videos`;
}
