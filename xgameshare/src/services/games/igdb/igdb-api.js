import { getTwitchTokenNameInStorage } from './../../auth/twitch/twitch-auth-service';
import { sendIgdbRequestImage, sendIgdbRequestData } from './igdb-request';

export async function getApiData(endpoint, payload) {
    return sendIgdbRequestData(process.env.REACT_APP_IGDB_PROXY_BASE_PATH_DATA + endpoint, 'POST', getTwitchTokenNameInStorage(), payload);
}


export async function getApiImage(url) {
    return sendIgdbRequestImage(process.env.REACT_APP_IGDB_PROXY_BASE_PATH_IMAGE + url, 'POST', getTwitchTokenNameInStorage());
}

