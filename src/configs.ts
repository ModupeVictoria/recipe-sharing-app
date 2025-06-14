import { createBrowserHistory } from "history";

//API CALL TYPE
//const TYPE_LOCAL = "LOCAL";
const TYPE_REST = "REST";
//console.log(77, process.env.NODE_ENV);

//resources
// const API_URL =
//   process.env.NODE_ENV === "production" ? "" : "https://dev.senshost.net/api";
//const API_URL = "http://senshost.com:8015/api";
const SOCKET_URL = "mqtt://senshost.com";
//API contexts
//We will pass this to swagger class constractor if we need different base urls
//const DEFAULT = "";
//const SECONDARY = "/something";

export enum APILIST {
  LOGIN = "login",
  REGISTER = "register",
  HOSTELS = "hostels",
  GET_HOSTEL = "get-hostel",
  GET_ALL_HOSTEL = "get-all-hostel",
  GET_ALL_USERS = "get-all-users"
}

//CONFIG DATA (Please change here only)
const configs = {
  delay: 500,
  dashbordRefreshRate: 1,
  port: 8015,
  appName: "senhost",
  toastDelay: 5000,
  tokenStorage: "TOKEN_PERSIST",
  socket: SOCKET_URL,
  type: TYPE_REST,

  // imageUrl: "http://127.0.0.1:8000/blogs/",
  // context: "http://127.0.0.1:8000/api",

  imageUrl: "https://dev.goafripay.com/blogs/",
  context : "https://dev.goafripay.com/api/v2",
  contextOld: "https://dev.goafripay.com/api",


  history: createBrowserHistory(),
  requestTimeOut: 30000,
  apiList: APILIST,
  tablePageSize: 10,
};
export default configs;