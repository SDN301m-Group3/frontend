'use client';

import { refreshAccessToken } from '@/lib/action';
import { updateToken } from '@/lib/fe-api';
import { useEffect } from 'react';

function getCookie(key: string) {
    var b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

export function RefreshTokenProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const interval = setInterval(async () => {
            const oldRefreshToken = getCookie('refresh-token');
            if (oldRefreshToken !== '') {
                const {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                } = await refreshAccessToken(oldRefreshToken as string);
                const response = await updateToken(
                    newAccessToken,
                    newRefreshToken
                );

                if (response) {
                    console.log('update token success');
                } else {
                    console.log('update token failed');
                }
            }
        }, 1000 * 60 * 50); // 50 minutes

        return () => clearInterval(interval);
    }, []);

    return <>{children}</>;
}
