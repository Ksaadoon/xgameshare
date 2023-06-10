import { getTwitchTokenNameInStorage } from './../../auth/twitch/twitch-auth-service';
import { sendIgdbRequestData } from './igdb-request';

export async function getApiData(endpoint, payload) {
    return sendIgdbRequestData(process.env.REACT_APP_IGDB_PROXY_BASE_PATH_DATA + endpoint, 'POST', getTwitchTokenNameInStorage(), payload);
}
