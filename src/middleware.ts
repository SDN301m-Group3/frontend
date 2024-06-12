import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)', '/api/:path*'],
};

const apiRequireAuth = ['/api/auth/update-token'];

const urlRequireAuthenticated = [
    '/logout',
    '/logout-all',
    '/group',
    '/group/*',
    '/album',
    '/album/*',
];

const urlRequireUnauthenticated = ['/login', '/register'];

function isValidUrl(route: string, urlList: string[]) {
    return urlList.some(pattern => {
        const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
        return regex.test(route);
    });
}

export async function middleware(req: NextRequest) {
    const { pathname, searchParams } = req.nextUrl;
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const accessToken = req.cookies.get('access-token');

    // Check if the request is for an URL that requires unauthenticated
    if (isValidUrl(pathname, urlRequireUnauthenticated)) {
        if (accessToken) {
            return Response.redirect(new URL(callbackUrl, req.nextUrl));
        }
    }

    // Check if the request is for an URL that requires authenticated
    if (isValidUrl(pathname, urlRequireAuthenticated)) {
        if (!accessToken) {
            return Response.redirect(new URL(callbackUrl, req.nextUrl));
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
