const BASE_URL = '/api/auth/twitch';

export async function auth(tokenName) {
    return sendApplicationAuthRequest(BASE_URL, 'POST', null, tokenName, false);
}

export default async function sendApplicationAuthRequest(url, method = 'GET', payload = null, tokenName) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
  
    console.log("sendApplicationAuthRequest called with url:" + url + " method:" + method + " payload:" + payload  + " tokenName: " + tokenName);  
    const options = { method };
    const res = await fetch(url, options);
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return await res.json();
    throw new Error('Bad Request');
  }
  