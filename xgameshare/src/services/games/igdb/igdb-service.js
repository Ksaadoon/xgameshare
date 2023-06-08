
import * as igbdAPI from './igdb-api';

export async function listData(endpoint, payload) {
    return await igbdAPI.listDataClient(endpoint, payload);
}

