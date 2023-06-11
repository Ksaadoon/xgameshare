import * as xgameshareAPI from './xgameshare-api'

export async function saveFavorite(user, game) {   
    return await xgameshareAPI.saveFavorite(user, game);
}
