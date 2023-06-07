import { getAccessToken } from './../../auth/twitch/twitch-auth-service';

export async function sendIgdbRequest(url, method = 'GET', tokenName, payload = null) {

  //console.log("sendRequest called with url:" + url + " method:" + method + " payload:" + payload + " tokenName: " + tokenName);

  const requestOptions = { method };

  if (payload) {
    requestOptions.headers = { 'Content-Type': 'application/json' };
    requestOptions.body = JSON.stringify(payload);
  }

  const token = getAccessToken(tokenName);
  if (token) {
    requestOptions.headers = requestOptions.headers || {};
    requestOptions.headers.Authorization = `Bearer ${token}`;
  }

  // Fetch accepts an options object as the 2nd argument used to include a data payload, set headers, etc. 
  const res = await fetch(url, requestOptions);
  if (res.ok) {
    return await res.json(); // await the response to get the data 
  }
  throw new Error('Bad Request');

}
