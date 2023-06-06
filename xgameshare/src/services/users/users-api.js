//this file is to send http request to the server.
import sendRequest from "../send-request";
import { getUserTokenNameInStorage } from "./users-service";

const BASE_URL = '/api/users';

export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', getUserTokenNameInStorage(), userData);
  }
  
  export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', getUserTokenNameInStorage(), credentials);
  }
  
  export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
  }