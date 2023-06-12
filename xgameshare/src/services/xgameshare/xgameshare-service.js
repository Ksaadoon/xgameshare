import * as xgameshareAPI from './xgameshare-api'

export async function saveFavorite(game) {   
    return await xgameshareAPI.saveFavorite( game);
}

export async function getFavorites() {
    return await xgameshareAPI.getFavorites();
}

export async function deleteFavorite(id) {
    return await xgameshareAPI.deleteFavorite(id);
}
