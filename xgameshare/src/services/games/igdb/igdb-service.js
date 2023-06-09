
import * as igbdAPI from './igdb-api';

export async function getData(endpoint, payload) {
    return await igbdAPI.getApiData(endpoint, payload);
}
