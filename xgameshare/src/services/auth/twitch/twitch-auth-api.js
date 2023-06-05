import sendRequest from '../../send-request';
const BASE_URL = '/api/auth/twitch';

export function auth(tokenName) {
    return sendRequest(BASE_URL, 'POST', null, tokenName);
}