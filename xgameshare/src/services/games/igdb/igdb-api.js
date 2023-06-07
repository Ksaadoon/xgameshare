import { getTwitchTokenNameInStorage } from './../../auth/twitch/twitch-auth-service';
import { sendIgdbRequest } from './igdb-request';

export async function listGamesClient(payload) {
    return sendIgdbRequest(process.env.REACT_APP_IGDB_PROXY_BASE_PATH + "/games", 'POST', getTwitchTokenNameInStorage(), payload);
}
 