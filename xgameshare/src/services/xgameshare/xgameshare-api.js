import sendRequest from './../send-request';
import { getUserToken } from '../users/users-service';

export async function saveFavorite(user, game) {

    const payload = { 
        igdb_game_id:game.game.id,
        user: user.user
    }  


    return await sendRequest(process.env.REACT_APP_XGAMESHARE_FAVORITE_GAMES_ENDPOINT, 'POST',  getUserToken(), payload);
}
