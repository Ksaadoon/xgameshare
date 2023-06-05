export default async function sendRequest(url, method = 'GET', payload = null, tokenName, checktoken) {
  
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
  //console.log("sendRequest called with url:" + url + " method:" + method + " payload:" + payload  + " tokenName: " + tokenName);

  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken(tokenName);
  if (token) {
    // Ensure that headers object exists
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return await res.json();
  throw new Error('Bad Request');
}

export function getToken(tokenName) {
  // will return null if the key does not exist
  //console.log("getToken(" + tokenName + ") call");
  const token = localStorage.getItem(tokenName);  
  console.log("getToken("+ tokenName + ") from local storage returns: " + token);
  if (!token) return null;
  // Let's check if token has expired...
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    console.log("the token :" + tokenName + " has expired!");
    localStorage.removeItem(tokenName);
    return null;
  }
  return token;
}