//this file is to send http request to the server.
import sendRequest from "../send-request";
const BASE_URL = '/api/users';

export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
  }
  
  export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  }
  
  export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
  }