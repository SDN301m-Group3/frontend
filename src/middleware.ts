import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from './lib/action';

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)', '/api/:path*'],
};

const apiRequireAuth = ['/api/auth/update-token'];

const urlRequireAuthenticated = ['/group', '/group/*', '/album', '/album/*', '/photo/*'];

const urlRequireUnauthenticated = ['/login', '/register'];

function isValidUrl(route: string, urlList: string[]) {
    return urlList.some((pattern) => {
        const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
        return regex.test(route);
    });
}

export async function middleware(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl;
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const accessToken = req.cookies.get('access-token');
    const refreshToken = req.cookies.get('refresh-token');

    if (refreshToken && !accessToken && !isValidUrl(pathname, ['/logout'])) {
        try {
            await refreshAccessToken(refreshToken.value);
        } catch (error) {
            return Response.redirect(new URL('/logout', req.nextUrl));
        }
    }

    // Check if the request is for an URL that requires unauthenticated
    if (isValidUrl(pathname, urlRequireUnauthenticated)) {
        if (accessToken) {
            return Response.redirect(new URL(callbackUrl, req.nextUrl));
        }
    }

    // Check if the request is for an URL that requires authenticated
    if (isValidUrl(pathname, urlRequireAuthenticated)) {
        if (!accessToken) {
            const absoluteUrl = new URL(req.nextUrl);
            absoluteUrl.pathname = '/login';
            absoluteUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
            return Response.redirect(absoluteUrl.toString());
        }
    }

    // Check if the request is for an API route that requires authentication
    if (isValidUrl(pathname, apiRequireAuth)) {
        if (!accessToken) {
            return NextResponse.json(
                {
                    error: 'Unauthorized',
                },
                { status: 401 }
            );
        }
    }
}
