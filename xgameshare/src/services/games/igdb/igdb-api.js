import { getTwitchTokenNameInStorage } from './../../auth/twitch/twitch-auth-service';
import { sendIgdbRequest } from './igdb-request';

export async function listDataClient(endpoint, payload) {
    return sendIgdbRequest(process.env.REACT_APP_IGDB_PROXY_BASE_PATH + endpoint, 'POST', getTwitchTokenNameInStorage(), payload);
}
 
 