import * as twitchAuthApi from './twitch-auth-api';
import { getToken } from '../../send-request';

const twitchTokenName = 'twitch_access_token';

export async function auth() {
    const token = await twitchAuthApi.auth(twitchTokenName);
    //console.log("auth: " + JSON.stringify(token));
    localStorage.setItem(twitchTokenName, token);
    return getTwitchAccessToken();
}

export function getTwitchAccessToken() {
    return getAccessToken(twitchTokenName);
}

export function getAccessToken(tokenName) {
    const token = getToken(tokenName);
    //console.log(token);
    return token ?
      JSON.parse(atob(token.split('.')[1])).access_token
      :
      null;
  }
