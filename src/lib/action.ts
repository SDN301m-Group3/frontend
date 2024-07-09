'use server';

import { z } from 'zod';
import {
    createAlbumFormSchema,
    createGroupFormSchema,
    loginFormSchema,
    registerFormSchema,
    joinGroupSchema,
} from './form-schema';
import axios, {
    AxiosError,
    AxiosProgressEvent,
    CancelTokenSource,
} from 'axios';
import { cookies } from 'next/headers';
import {
    AuthResponse,
    DemoUser,
    SearchUser,
    User,
    UserNotification,
} from './define';
import { getImageSize } from 'react-image-size';
// import cookie from '@boiseitguru/cookie-cutter';

axios.defaults.baseURL = process.env.API_URL;

const maxAgeRefreshToken = 60 * 60 * 24 * 365;

export async function refreshAccessToken(token: string) {
    return await axios
        .post(`/auth/refresh-token`, {
            refreshToken: token,
        })
        .then((res) => {
            const { accessToken, refreshToken } = res.data;
            let payload = atob(accessToken.split('.')[1]);
            const user = JSON.parse(payload) as User;

            cookies().set('refresh-token', refreshToken, {
                maxAge: maxAgeRefreshToken,
            });
            let expiryDate = new Date(user.exp * 1000);
            cookies().set('access-token', accessToken, {
                expires: expiryDate,
            });
            return res.data as AuthResponse;
        })
        .catch((error) => {
            throw error;
        });
}

export async function getAuthHeader() {
    let oldAccessToken = cookies().get('access-token')?.value;
    let oldRefreshToken = cookies().get('refresh-token')?.value;
    let accessToken = oldAccessToken;
    // if (!oldAccessToken && oldRefreshToken) {
    //     try {
    //         const {
    //             accessToken: newAccessToken,
    //             refreshToken: newRefreshToken,
    //         } = await refreshAccessToken(oldRefreshToken as string);

    //         let payload = atob(newAccessToken.split('.')[1]);
    //         const user = JSON.parse(payload) as User;

    //         cookies().set('refresh-token', newRefreshToken, {
    //             maxAge: maxAgeRefreshToken,
    //         });
    //         accessToken = newAccessToken;
    //         let expiryDate = new Date(user.exp * 1000);
    //         cookies().set('access-token', newAccessToken, {
    //             expires: expiryDate,
    //         });
    //     } catch (error) {
    //         if (error instanceof AxiosError) {
    //             console.log(error.response?.data);
    //         }
    //     }
    // }
    if (accessToken) {
        return { Authorization: `Bearer ${accessToken}` };
    }
    return {};
}

export async function getUser() {
    const user = cookies().get('user');
    return user ? (JSON.parse(user.value) as User) : null;
}

export const login = async (formData: z.infer<typeof loginFormSchema>) => {
    try {
        const { email, password }: z.infer<typeof loginFormSchema> = formData;
        const response = await axios
            .post('/auth/login', {
                email,
                password,
            })
            .then((res) => {
                const { accessToken, refreshToken } = res.data;

                let payload = atob(accessToken.split('.')[1]);
                const cookie = cookies();
                const user = JSON.parse(payload) as User;
                cookie.set('refresh-token', refreshToken, {
                    maxAge: maxAgeRefreshToken,
                });
                let expiryDate = new Date(user.exp * 1000);
                cookie.set('access-token', accessToken, {
                    expires: expiryDate,
                });
                cookie.set('user', payload, { maxAge: maxAgeRefreshToken });

                return {
                    isSuccess: true,
                    error: '',
                };
            })
            .catch((error) => {
                return {
                    isSuccess: false,
                    error: error.response.data.error.message || 'Unknown error',
                };
            });
        return response;
    } catch (error: any) {
        return {
            isSuccess: false,
            error: error.message || 'Unknown error',
        };
    }
};

export const logout = async () => {
    const refreshToken = cookies().get('refresh-token')?.value;
    try {
        cookies().delete('access-token');
        cookies().delete('refresh-token');
        cookies().delete('user');
        await axios.delete('/auth/logout', { data: { refreshToken } });
        return {
            isSuccess: true,
            error: '',
        };
    } catch (error: any) {
        return {
            isSuccess: false,
            error: error.message || 'Unknown error',
        };
    }
};

export const logoutAll = async () => {
    const refreshToken = cookies().get('refresh-token')?.value;
    try {
        await axios.delete('/auth/logout-all', { data: { refreshToken } });
        cookies().delete('access-token');
        cookies().delete('refresh-token');
        cookies().delete('user');
        return {
            isSuccess: true,
            error: '',
        };
    } catch (error: any) {
        return {
            isSuccess: false,
            error: error.message || 'Unknown error',
        };
    }
};

export const register = async (
    formData: z.infer<typeof registerFormSchema>
) => {
    try {
        const {
            fullName,
            username,
            email,
            phoneNumber,
            password,
        }: z.infer<typeof registerFormSchema> = formData;

        const response = await axios
            .post('/auth/register', {
                fullName,
                username,
                email,
                phoneNumber,
                password,
            })
            .then((res) => {
                return {
                    isSuccess: true,
                    error: '',
                };
            })
            .catch((error) => {
                return {
                    isSuccess: false,
                    error: error.response.data.error.message || 'Unknown error',
                };
            });
        return response;
    } catch (error: any) {
        return {
            isSuccess: false,
            error: error.message || 'Unknown error',
        };
    }
};

export const createGroup = async (
    formData: z.infer<typeof createGroupFormSchema>
) => {
    const { title, description }: z.infer<typeof createGroupFormSchema> =
        formData;

    const response = await axios
        .post(
            '/groups/create',
            {
                title,
                description,
            },
            {
                headers: await getAuthHeader(),
            }
        )
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
            };
        });

    return response;
};

export const createAlbum = async (
    formData: z.infer<typeof createAlbumFormSchema>,
    groupId: string
) => {
    const { title, description }: z.infer<typeof createAlbumFormSchema> =
        formData;
    const response = await axios
        .post(
            `/groups/${groupId}/create-album`,
            {
                title,
                description,
            },
            {
                headers: await getAuthHeader(),
            }
        )
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
            };
        });
    return response;
};

export const joinGroup = async (formData: z.infer<typeof joinGroupSchema>) => {
    const { code }: z.infer<typeof joinGroupSchema> = formData;

    const response = await axios
        .post(
            '/groups/join',
            {
                groupCode: code,
            },
            {
                headers: await getAuthHeader(),
            }
        )
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
            };
        });

    return response;
};

export const uploadImage = async (formData: FormData, path?: string) => {
    if (!path) {
        path = '/upload/default';
    }
    // return axios
    //     .post(path, formData, {
    //         headers: await getAuthHeader(),
    //     })
    //     .then((res) => {
    //         return {
    //             isSuccess: true,
    //             error: '',
    //         };
    //     })
    //     .catch((error) => {
    //         return {
    //             isSuccess: false,
    //             error: error.response.data.error.message || 'Unknown error',
    //         };
    //     });

    return {
        isSuccess: true,
        url: 'https://plus.unsplash.com/premium_photo-1718088301356-d762d95d754a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
};

export const addPhoto = async (formData: any, albumId: string) => {
    // return axios
    //     .post(`/album/${albumId}/upload`, formData,
    //         {
    //             headers: await getAuthHeader(),
    //         }
    //     )
    //     .then((res) => {
    //         return {
    //             isSuccess: true,
    //             error: '',
    //         };
    //     })
    //     .catch((error) => {
    //         return {
    //             isSuccess: false,
    //             error: error.response.data.error.message || 'Unknown error',
    //         };
    //     });
    return {
        isSuccess: true,
        error: '',
    };
};

export const getUsers = async (search: string) => {
    try {
        const response = await axios.get('/users', {
            headers: await getAuthHeader(),
            params: { search },
        });
        return response.data as SearchUser[];
    } catch (error) {
        return [] as SearchUser[];
    }
};

export const inviteUserToGroup = async (groupId: string, email: string) => {
    const response = await axios
        .post(
            `/groups/${groupId}/invite`,
            {
                email,
            },
            {
                headers: await getAuthHeader(),
            }
        )
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
                data: res.data as UserNotification,
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
                data: null,
            };
        });
    return response;
};

export const acceptInviteToGroup = async (
    groupId: string,
    inviteToken: string
) => {
    const response = await axios
        .post(`/groups/${groupId}/accept-invite`, undefined, {
            headers: await getAuthHeader(),
            params: { inviteToken },
        })
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
            };
        });
    return response;
};

export const getUserNotifications = async () => {
    try {
        const response = await axios.get('/notifications/my-notifications', {
            headers: await getAuthHeader(),
        });
        return response.data as UserNotification[];
    } catch (error) {
        return [] as UserNotification[];
    }
};

export const markNotificationAsSeen = async (notificationId: string) => {
    const response = await axios
        .put(`/notifications/${notificationId}/mark-as-seen`, undefined, {
            headers: await getAuthHeader(),
        })
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
            };
        });

    return response;
};

export const removeGroup = async (groupId: string) => {
    const response = await axios
        .put(`groups/${groupId}/remove`, undefined, {
            headers: await getAuthHeader(),
        })
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
                data: res.data as UserNotification,
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
                data: null,
            };
        });
    return response;
};

export const commentOnPhoto = async (photoId: string, comment: string) => {
    const response = await axios
        .post(
            `/photos/${photoId}/comment`,
            {
                content: comment,
            },
            {
                headers: await getAuthHeader(),
            }
        )
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
                data: res.data as any,
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
                data: null,
            };
        });

    return response;
};

export const kickGroupMember = async (groupId: string, memberId: string) => {
    const response = await axios
        .put(`groups/${groupId}/remove-user/${memberId}`, undefined, {
            headers: await getAuthHeader(),
        })
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
                data: res.data as UserNotification,
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
                data: null,
            };
        });
    return response;
};

// export const uploadPhoto = async (
//     formData: FormData,
//     albumId: string,
//     onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
//     cancelSource?: CancelTokenSource
// ) => {
//     'use server';
//     return await axios
//         .post(`albums/${albumId}/upload-photo`, formData, {
//             onUploadProgress,
//             cancelToken: cancelSource?.token,
//         })
//         .then((res) => {
//             return {
//                 isSuccess: true,
//                 error: '',
//                 data: res.data as UserNotification,
//             };
//         });
// };

export const uploadPhotoToAws = async (
    formData: FormData,
    albumId: string,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    cancelSource: CancelTokenSource
) => {
    return axios.post(`/albums/${albumId}/upload-photo`, formData, {
        onUploadProgress,
        cancelToken: cancelSource.token,
        headers: await getAuthHeader(),
    });
};

export const inviteUserToAlbum = async (albumId: string, email: string) => {
    const response = await axios
        .post(
            `/albums/${albumId}/invite`,
            {
                email,
            },
            {
                headers: await getAuthHeader(),
            }
        )
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
                data: res.data as UserNotification,
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data?.error.message || 'Unknown error',
                data: null,
            };
        });
    return response;
};

export const acceptInviteToAlbum = async (
    albumId: string,
    inviteToken: string
) => {
    const response = await axios
        .post(`/albums/${albumId}/accept-invite`, undefined, {
            headers: await getAuthHeader(),
            params: { inviteToken },
        })
        .then((res) => {
            return {
                isSuccess: true,
                error: '',
            };
        })
        .catch((error) => {
            return {
                isSuccess: false,
                error: error.response.data?.error.message || 'Unknown error',
            };
        });
    return response;
};
