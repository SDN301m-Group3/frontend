export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
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
