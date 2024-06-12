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
    const albums = [
        {
            _id: '1',
            title: 'Album 1',
            description: 'Description 1',
            imageUrl:
                'https://images.unsplash.com/photo-1567244905445-fbc77af2dce3?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            _id: '2',
            title: 'Album 2',
            description: 'Description 2',
            imageUrl:
                'https://images.unsplash.com/photo-1567244905445-fbc77af2dce3?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            _id: '3',
            title: 'Album 3',
            description: 'Description 3',
            imageUrl:
                'https://images.unsplash.com/photo-1567244905445-fbc77af2dce3?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
            _id: '4',
            title: 'Album 4',
            description: 'Description 4',
            imageUrl:
                'https://images.unsplash.com/photo-1567244905445-fbc77af2dce3?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ];
    // try {
    //     const response = await axios.get(`/groups/${groupId}/albums`, {
    //         headers: await getAuthHeader(),
    //     });
    //     return response.data;
    //
    // } catch (error) {
    //     return [] as Album[];
    // }
    return albums as Album[];
};

export const getGroupMembers = async (groupId: string) => {
    const people = [
        {
            _id: '1',
            username: 'John Doe',
            fullName: 'Software Engineer',
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
        },
        {
            _id: '2',
            username: 'Robert Johnson',
            fullName: 'Product Manager',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
        },
        {
            _id: '3',
            username: 'Jane Smith',
            fullName: 'Data Scientist',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
        },
        {
            _id: '4',
            username: 'Emily Davis',
            fullName: 'UX Designer',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
        },
        {
            _id: '5',
            username: 'Tyler Durden',
            fullName: 'Soap Developer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
        },
        {
            _id: '6',
            username: 'Dora',
            fullName: 'The Explorer',
            image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80',
        },
    ];

    return people as GroupMember[];
};
