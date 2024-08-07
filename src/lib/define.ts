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

export type BreadItem = {
    title: string;
    url: string;
    active: boolean;
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
    img: string;
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
    groupImg: string;
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
    mode?: string;
};

export type SearchSharePhotoParams = {
    sort?: string;
    page?: number;
    pageSize?: number;
    search?: string;
    shareToken?: string;
};

export type SearchPhotoCommentParams = {
    page?: number;
    pageSize?: number;
    sort?: string;
};

export type SearchAlbumParams = {
    search?: string;
};

export type SearchUser = {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    img: string;
};

export type UserNotification = {
    _id: string;
    user: {
        _id: string;
        username: string;
        email: string;
        fullName: string;
        img: string;
    };
    type: string;
    receivers: string;
    content: string;
    seen: string[];
    redirectUrl: string;
    createdAt: string;
    groupId?: string;
    albumId?: string;
};

export type PhotoDetail = {
    _id: string;
    title: string;
    tags: string[];
    url: string;
    mimeType: string;
    createdAt: string;
    owner: {
        _id: string;
        fullName: string;
        username: string;
        email: string;
        img: string;
    };
    group: {
        _id: string;
        title: string;
    };
    album: {
        _id: string;
        title: string;
    };
    isReacted: boolean;
    totalReact: number;
    totalComment: number;
};

export type PhotoReact = {
    _id: string;
    createdAt: string;
    owner: {
        id: string;
        fullName: string;
        username: string;
        email: string;
    };
};

export type ReactUser = {
    _id: string;
    user: {
        _id: string;
        fullName: string;
        username: string;
        email: string;
        img: string;
    };
    createdAt: string;
    updatedAt: string;
};

export type PhotoComment = {
    _id: string;
    content: string;
    createdAt: string;
    user: {
        _id: string;
        fullName: string;
        username: string;
        email: string;
        img: string;
    };
};

export type RecentPhoto = {
    _id: string;
    actionType: string;
    photo: {
        _id: string;
        album: {
            _id: string;
            group: {
                _id: string;
                title: string;
            };
            title: string;
        };
        owner: {
            _id: string;
            username: string;
            email: string;
            fullName: string;
            img: string;
        };
        url: string;
    };
    createdAt: string;
    updatedAt: string;
};
