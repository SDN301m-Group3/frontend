import { User } from '@/lib/define';
import { NextRequest, NextResponse } from 'next/server';

const maxAgeRefreshToken = 60 * 60 * 24 * 365;

export const POST = async (req: NextRequest) => {
    try {
        const { accessToken, refreshToken } = await req.json();
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const response = NextResponse.json({}, { status: 200 });

        let payload = atob(accessToken.split('.')[1]);
        const user = JSON.parse(payload) as User;

        response.cookies.set('refresh-token', refreshToken, {
            maxAge: maxAgeRefreshToken,
        });
        let expiryDate = new Date(user.exp * 1000);
        response.cookies.set('access-token', accessToken, {
            expires: expiryDate,
        });

        return response;
    } catch (error) {
        const response = NextResponse.json(
            {
                error: 'Invalid refresh token. Please login again.',
            },
            { status: 400 }
        );
        response.cookies.delete('access-token');
        response.cookies.delete('refresh-token');
        response.cookies.delete('user');
        return response;
    }
};
