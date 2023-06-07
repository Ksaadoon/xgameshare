import { getAccessToken } from './../../auth/twitch/twitch-auth-service';

export async function sendIgdbRequest(url, method = 'POST', tokenName, payload = null) {
  
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
  //console.log("sendRequest called with url:" + url + " method:" + method + " payload:" + payload  + " tokenName: " + tokenName);

  const requestOptions = { method };

  // const payload = {
  //   fields: '*'
  // };
  

  requestOptions.headers = { 'Content-Type': 'application/json' };
  if (payload) {
    requestOptions.body = JSON.stringify(payload);
  }

  const token = getAccessToken(tokenName);
  if (token) {   
    requestOptions.headers = requestOptions.headers || {};
    requestOptions.headers.Authorization = `Bearer ${token}`;
    requestOptions.headers['Client-ID'] = '3vei7tcaokpacpb2m5a94lgkqdz0bu';
  }


// CORS Stuff
const corsProxyUrl = 'http://localhost:3001'; // Update the proxy port to match the Express server port
const proxyPath = '/proxy/:proxyUrl*'; // The same proxy path used in the Express server

const targetUrl = 'https://api.igdb.com/v4/games';
const encodedUrl = encodeURIComponent(targetUrl);

const proxiedUrl = `${corsProxyUrl}${proxyPath}/${encodedUrl}`;

const res = await fetch(proxiedUrl, requestOptions);
// res.ok will be false if the status code set to 4xx in the controller action
console.log("res: " + JSON.stringify(res));
if (res.ok) return await res.json();

throw new Error('Bad Request');

}
