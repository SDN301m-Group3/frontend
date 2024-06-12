import axios from 'axios';
import { getAuthHeader } from './action';
import { Group } from './define';

axios.defaults.baseURL = process.env.API_URL;

export async function getMyGroups() {
    return await axios
        .get(`/groups/my-groups`, {
            headers: await getAuthHeader(),
        })
        .then(res => {
            return res.data as Group[];
        })
        .catch(error => {
            return [] as Group[];
        });
}
