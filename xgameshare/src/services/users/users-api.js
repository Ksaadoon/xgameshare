//this file is to send http request to the server.
import sendRequest from "../send-request";
const BASE_URL = '/api/users';


export function signUp(userData, userTokenName) {
    return sendRequest(BASE_URL, 'POST', userData, userTokenName);
  }
  
  export function login(credentials, userTokenName) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials, userTokenName);
  }
  
  export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
  }