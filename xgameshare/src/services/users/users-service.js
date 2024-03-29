//Provide user to react component needed; The service will call the user service api
//usersAPI is going to be an object that contains all the functions described in the users-api file
import * as usersAPI from './users-api';
import { getToken } from '../send-request';

const userTokenName = 'userToken';

export function getUserTokenNameInStorage() {
  return userTokenName;
}

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem(getUserTokenNameInStorage(), token);
    return getUser(getUserTokenNameInStorage());
}

export async function login(credentials) {
    // Delegate the fetch request to the users-api.js module.
    const token = await usersAPI.login(credentials);
    console.log("setting " + getUserTokenNameInStorage() + " in localStorage with value: " + JSON.stringify(token));
    localStorage.setItem(getUserTokenNameInStorage(), token);
    return getUser(getUserTokenNameInStorage());
  }
  
  //Trick to be able to call this in the App.jsx file without to hard code
  //the 'userToke' value in it.
  export function getUserToken() {
    return getUser(getUserTokenNameInStorage());
  }

  export function getUser(userTokenName) {
    const token = getToken(userTokenName);
    return token ?
      JSON.parse(atob(token.split('.')[1])).user
      :
      null;
  }
  
  export function logOut() {
    localStorage.removeItem(getUserTokenNameInStorage());
  }
   
  export function checkToken() {
    return usersAPI.checkToken().then(dateStr => new Date(dateStr));
  }