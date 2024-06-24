export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};

export type PageMeta = {
    totalPages: number;
    page: number;
    totalElements: number;
    pageSize: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export enum SearchParams {
    SORT = 'sort',
    PAGE = 'page',
    PER_PAGE = 'perPage',
    MODE = 'mode',
}

export type SortOption = {
    label: string;
    value: string;
    field: string;
};

export type User = {
    email: string;
    username: string;
    fullName: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
};

export type DemoUser = {
    id: number;
    name: string;
};

export type Group = {
    _id: string;
    title: string;
    owner: {
        fullName: string;
        email: string;
    };
    description: string;
    numberOfAlbums: number;
    numberOfMembers: number;
};

export type RecentImage = {
    _id: string;
    imageUrl: string;
    openAt: string;
    author: {
        _id: string;
        fullName: string;
        email: string;
        avatar: string;
    };
    group: {
        _id: string;
        title: string;
    };
};

export type Album = {
    _id: string;
    title: string;
    description: string;
    photos: [
        {
            _id: string;
            url: string;
        },
    ];
};

export type GroupMember = {
    _id: string;
    username: string;
    fullName: string;
    img: string;
};

export type AlbumMember = {
    _id: string;
    username: string;
    fullName: string;
    img: string;
};

export type GroupInfo = {
    _id: string;
    owner: {
        _id: string;
        email: string;
        fullName: string;
        img: string;
    };
    title: string;
    description: string;
    groupCode: string;
    albums: [
        {
            _id: string;
            title: string;
            description: string;
        },
    ];
    members: [
        {
            _id: string;
            username: string;
            email: string;
            fullName: string;
            img: string;
        },
    ];
    createdAt: string;
};

export type AlbumInfo = {
    _id: string;
    group: {
        _id: string;
        title: string;
        description: string;
        groupImg: string;
    };
    owner: {
        _id: string;
        username: string;
        email: string;
        fullName: string;
        img: string;
    };
    title: string;
    description: string;
    members: [
        {
            _id: string;
            username: string;
            email: string;
            fullName: string;
            img: string;
        },
    ];
    createdAt: string;
};

export type Photo = {
    _id: string;
    url: string;
    title: string;
    createdAt: string;
    owner: {
        _id: string;
        fullName: string;
        username: string;
        img: string;
    };
};

export type SearchPhotoParams = {
    sort?: string;
    page?: number;
    pageSize?: number;
    published?: string;
    search?: string;
};

export type UserInfo = {
    fullName?: string;
    username?: string;
    phoneNumber?: string;
    bio?: string;
    img?: string;
};
