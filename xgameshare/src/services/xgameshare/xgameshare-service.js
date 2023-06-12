import * as xgameshareAPI from './xgameshare-api'

export async function saveFavorite(user, game) {   
    return await xgameshareAPI.saveFavorite( user, game);
}

export async function getFavorites() {
    return await xgameshareAPI.getFavorites();
}

export async function deleteFavorite(id) {
    return await xgameshareAPI.deleteFavorite(id);
}
