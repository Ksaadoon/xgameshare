import * as twitchAuthApi from './twitch-auth-api';
import { getToken } from '../../send-request';

const twitchTokenName = 'twitch_access_token';

export function getTwitchTokenNameInStorage() {
    return twitchTokenName;
}

/**
 * Calls the twitch API to get an auth token (will contain access token, expiration date)
 * Sets the auth token in the local storage
 * Extract only the access token from the token to be assigned at the application level on the client side.
 * @returns twitch access token 
 */
export async function auth() {
    const token = await twitchAuthApi.auth(getTwitchTokenNameInStorage());
    console.log("setting " + getTwitchTokenNameInStorage() + " in localStorage with value: " + JSON.stringify(token));
    localStorage.setItem(getTwitchTokenNameInStorage(), token);
    return getTwitchAccessToken();
}

export function getTwitchAccessToken() {
    return getAccessToken(getTwitchTokenNameInStorage());
}

/**
 * 
 * @returns from the twitch token, extracts the twitch access token from the payload
 */
export function getAccessToken(tokenName) {
    const token = getToken(tokenName);
    return token ?
        JSON.parse(atob(token.split('.')[1])).access_token
        :
        null;
}

/**
 * 
 * @returns from the twitch token, extracts the expiration time from the payload
 */
export function getAccessTokenExpiresIn() {
    const token = getToken(getTwitchTokenNameInStorage());
    return token ?
        JSON.parse(atob(token.split('.')[1])).exp
        :
        null;
}



/**
 * Check if the twich access token is about to expire in the next 3 minutes
 * @param {token} 
 * @returns 
 */
export function isTokenExpiring(expirationTime) {

    if (expirationTime) {
        const expirationTimeMs = expirationTime.exp * 1000; // Convert expiration time to milliseconds
        const currentTime = Date.now();
        const timeDifference = expirationTimeMs - currentTime;
        const threeMinutesInMilliseconds = 3 * 60 * 1000; // Convert 3 minutes to milliseconds

        if (timeDifference <= threeMinutesInMilliseconds) {
            // Token is about to expire in the next 3 minutes
            return true;
        }
        return false;
    }
    return true;
}