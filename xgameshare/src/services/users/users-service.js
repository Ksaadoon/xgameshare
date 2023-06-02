//Provide user to react component needed; The service will call the user service api
//usersAPI is going to be an object that contains all the functions described in the users-api file
import * as usersAPI from './users-api';

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
}

export async function login(credentials) {
    // Delegate the AJAX request to the users-api.js
    // module.
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
  }

export function getToken() {
    // getItem will return null if the key does not exist
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Let's check if token has expired...
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      // Token has expired
      localStorage.removeItem('token');
      return null;
    }
    return token;
  }
  
  export function getUser() {
    const token = getToken();
    return token ?
      JSON.parse(atob(token.split('.')[1])).user
      :
      null;
  }
  
  export function logOut() {
    localStorage.removeItem('token');
  }
  
 
  export function checkToken() {
    return usersAPI.checkToken().then(dateStr => new Date(dateStr));
  }