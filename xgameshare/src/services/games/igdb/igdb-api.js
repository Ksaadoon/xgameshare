import { getTwitchTokenNameInStorage } from './../../auth/twitch/twitch-auth-service';
import { sendIgdbRequest } from './igdb-request';

const BASE_URL = "https://api.igdb.com/v4";

export async function listGamesClient(payload) {
    return sendIgdbRequest(BASE_URL + "/games", 'POST', getTwitchTokenNameInStorage(), payload);
}
 