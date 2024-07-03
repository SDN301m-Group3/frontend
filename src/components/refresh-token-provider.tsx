'use client';

import { refreshAccessToken } from '@/lib/action';
import { useRouter } from 'next/navigation';
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
    const router = useRouter();
    useEffect(() => {
        const interval = setInterval(
            async () => {
                try {
                    const oldRefreshToken = getCookie('refresh-token');
                    if (oldRefreshToken !== '') {
                        await refreshAccessToken(oldRefreshToken as string);
                    }
                } catch (error) {
                    console.log('update token failed');
                    router.push('/logout');
                }
            },
            1000 * 50 * 10
        ); // 50 minutes

        return () => clearInterval(interval);
    }, [router]);

    return <>{children}</>;
}
