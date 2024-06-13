import axios from 'axios';
import { getAuthHeader } from './action';
import { Album, Group, GroupMember } from './define';

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

export const getAlbumsByGroup = async (groupId: string) => {
    try {
        const response = await axios.get(`/groups/${groupId}/albums`, {
            headers: await getAuthHeader(),
        });
        console.log(response.data);
        return response.data as Album[];
    } catch (error) {
        // console.log(error);
        return [] as Album[];
    }
};

export const getGroupMembers = async (groupId: string) => {
    try {
        const response = await axios.get(
            `/groups/${groupId}/members?limit=10`,
            {
                headers: await getAuthHeader(),
            }
        );
        return response.data as GroupMember[];
    } catch (error) {
        return [] as GroupMember[];
    }
};
