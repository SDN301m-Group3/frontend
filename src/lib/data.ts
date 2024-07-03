import axios from 'axios';
import {
    Album,
    AlbumInfo,
    AlbumMember,
    Group,
    GroupInfo,
    GroupMember,
    PageMeta,
    Photo,
    PhotoComment,
    PhotoDetail,
    PhotoReact,
    SearchAlbumParams,
    SearchPhotoCommentParams,
    SearchPhotoParams,
    SearchUser,
} from './define';
import http from '@/config/axios';

axios.defaults.baseURL = process.env.API_URL;

export async function getMyGroups() {
    return await http
        .get(`/groups/my-groups`)
        .then((res) => {
            return res.data as Group[];
        })
        .catch((error) => {
            return [] as Group[];
        });
}

export async function getJoinedGroups() {
    return await http
        .get(`/groups/all-groups`)
        .then((res) => {
            return res.data as Group[];
        })
        .catch((error) => {
            return [] as Group[];
        });
}

export const getAlbumsByGroup = async (
    groupId: string,
    searchParams: SearchAlbumParams
) => {
    try {
        const response = await http.get(`/groups/${groupId}/albums`, {
            params: searchParams,
        });
        return response.data as Album[];
    } catch (error) {
        return [] as Album[];
    }
};

export const getGroupMembers = async (groupId: string) => {
    try {
        const response = await http.get(`/groups/${groupId}/members?limit=10`);
        return response.data as GroupMember[];
    } catch (error) {
        return [] as GroupMember[];
    }
};

export const getAlbumMembers = async (album: string) => {
    try {
        const response = await http.get(`/albums/${album}/members?limit=10`);
        return response.data as AlbumMember[];
    } catch (error) {
        return [] as AlbumMember[];
    }
};

export const getGroupInfo = async (groupId: string) => {
    try {
        const response = await http.get(`/groups/${groupId}`);
        return response.data as GroupInfo;
    } catch (error) {
        return {} as GroupInfo;
    }
};

export const getAlbumInfo = async (albumId: string) => {
    try {
        const response = await http.get(`/albums/${albumId}`);
        return response.data as AlbumInfo;
    } catch (error) {
        return {} as AlbumInfo;
    }
};

const pageMetaDefault = {
    totalPages: 0,
    page: 0,
    pageSize: 0,
    hasNext: false,
    hasPrev: false,
} as PageMeta;

export const getPhotosByAlbumId = async (
    albumId: string,
    searchParams: SearchPhotoParams
) => {
    try {
        const { photos, pageMeta } = await http
            .get(`/albums/${albumId}/photos`, {
                params: searchParams,
            })
            .then((res) => {
                return {
                    photos: res.data.photos as Photo[],
                    pageMeta: res.data.pageMeta as PageMeta,
                };
            });
        return { photos, pageMeta };
    } catch (error) {
        return {
            photos: [] as Photo[],
            pageMeta: pageMetaDefault as PageMeta,
        };
    }
};

export const getPhotoDetail = async (photoId: string) => {
    const response = await http
        .get(`/photos/${photoId}`)
        .then((res) => {
            return res.data as PhotoDetail;
        })
        .catch((error) => {
            return {} as PhotoDetail;
        });

    return response;
};

export const getPhotoComments = async (
    photoId: string,
    searchParams: SearchPhotoCommentParams
) => {
    const { comments, pageMeta } = await http
        .get(`/photos/${photoId}/comments`, {
            params: searchParams,
        })
        .then((res) => {
            return {
                comments: res.data.comments as PhotoComment[],
                pageMeta: res.data.pageMeta as PageMeta,
            };
        })
        .catch((error) => {
            return {
                comments: [] as PhotoComment[],
                pageMeta: pageMetaDefault as PageMeta,
            };
        });

    return { comments, pageMeta };
};

export const getPhotoReacts = async (photoId: string) => {
    const response = await http
        .get(`/photos/${photoId}/reacts`)
        .then((res) => {
            return res.data as PhotoReact[];
        })
        .catch((error) => {
            return [] as PhotoReact[];
        });

    return response;
};
