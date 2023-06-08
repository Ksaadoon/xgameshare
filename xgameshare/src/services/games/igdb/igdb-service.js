
import * as igbdAPI from './igdb-api';

export async function listGames(payload) {
    return await igbdAPI.listGamesClient(payload);
}

export async function listGenres(payload) {
    return await igbdAPI.listGenresClient(payload);
}

