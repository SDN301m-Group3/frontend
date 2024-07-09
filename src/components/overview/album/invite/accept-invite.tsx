'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { acceptInviteToAlbum } from '@/lib/action';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Redirect from './redirect-to-album';
import { useEffect, useState } from 'react';

export default function AcceptInviteToAlbum({
    albumId,
    inviteToken,
}: {
    albumId: string;
    inviteToken: string;
}) {
    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);

    useEffect(() => {
        acceptInviteToAlbum(albumId, inviteToken)
            .then((res) => {
                setResult(res);
            })
            .catch((err) => {
                setResult({ error: err.message, isSuccess: false });
            });
    }, [albumId, inviteToken]);

    return (
        <>
            {!result?.isSuccess ? (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {result?.error || 'Unknown error'}
                    </AlertDescription>
                </Alert>
            ) : (
                <Redirect albumId={albumId} />
            )}
        </>
    );
}
