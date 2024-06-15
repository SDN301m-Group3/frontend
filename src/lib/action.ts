'use server';

import { z } from 'zod';
import {
    createGroupFormSchema,
    joinGroupSchema,
    loginFormSchema,
    registerFormSchema,
} from './form-schema';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { AuthResponse, DemoUser, User } from './define';
// import cookie from '@boiseitguru/cookie-cutter';

axios.defaults.baseURL = process.env.API_URL;

const maxAgeRefreshToken = 60 * 60 * 24 * 365;

export async function refreshAccessToken(token: string) {
    return await axios
        .post(`/auth/refresh-token`, {
            refreshToken: token,
        })
        .then(res => {
            return res.data as AuthResponse;
        });
}

export async function getAuthHeader() {
    let oldAccessToken = cookies().get('access-token')?.value;
    let oldRefreshToken = cookies().get('refresh-token')?.value;
    let accessToken = oldAccessToken;
    if (!oldAccessToken && oldRefreshToken) {
        try {
            const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            } = await refreshAccessToken(oldRefreshToken as string);

            let payload = atob(newAccessToken.split('.')[1]);
            const user = JSON.parse(payload) as User;

            cookies().set('refresh-token', newRefreshToken, {
                maxAge: maxAgeRefreshToken,
            });
            accessToken = newAccessToken;
            let expiryDate = new Date(user.exp * 1000);
            cookies().set('access-token', newAccessToken, {
                expires: expiryDate,
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
            }
        }
    }
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
            .then(res => {
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
            .catch(error => {
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
            .then(res => {
                return {
                    isSuccess: true,
                    error: '',
                };
            })
            .catch(error => {
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

export const getUsers = async () => {
    try {
        const response = await axios.get('/users', {
            headers: await getAuthHeader(),
        });
        return response.data as DemoUser[];
    } catch (error) {
        return [] as DemoUser[];
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
        .then(res => {
            return {
                isSuccess: true,
                error: '',
            };
        })
        .catch(error => {
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
        .then(res => {
            return {
                isSuccess: true,
                error: '',
            };
        })
        .catch(error => {
            return {
                isSuccess: false,
                error: error.response.data.error.message || 'Unknown error',
            };
        });

    return response;
};
