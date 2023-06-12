import sendRequest from './../send-request';
import { getUserTokenNameInStorage } from '../users/users-service';

export async function saveFavorite(user, game) {

    const payload = { 
        igdb_game_id:game.game.id,
    }
    return await sendRequest(process.env.REACT_APP_XGAMESHARE_FAVORITE_GAMES_ENDPOINT, 'POST',  getUserTokenNameInStorage(), payload);
}


export async function getFavorites() {
    return await sendRequest(process.env.REACT_APP_XGAMESHARE_FAVORITE_GAMES_ENDPOINT, 'GET',  getUserTokenNameInStorage());
}


export async function deleteFavorite(id) {
    return await sendRequest(process.env.REACT_APP_XGAMESHARE_FAVORITE_GAMES_ENDPOINT + "/" + id, 'DELETE',  getUserTokenNameInStorage());
}

