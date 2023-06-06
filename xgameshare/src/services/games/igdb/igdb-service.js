
import * as igbdAPI from './igdb-api';

export async function listGames() {
    return await igbdAPI.listGamesClient()  
}
