
import * as igbdAPI from './igdb-api';

export async function getData(endpoint, payload) {
    return await igbdAPI.getApiData(endpoint, payload);
}

export async function getCardImage(url_image) {
    return await igbdAPI.getApiImage(url_image);
}

