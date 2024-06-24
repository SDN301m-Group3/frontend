'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { acceptInviteToGroup } from '@/lib/action';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Redirect from './redirect-to-group';
import { useEffect, useState } from 'react';

export default function AcceptInviteToGroup({
    groupId,
    inviteToken,
}: {
    groupId: string;
    inviteToken: string;
}) {
    // const result = await acceptInviteToGroup(groupId, inviteToken);

    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);

    useEffect(() => {
        acceptInviteToGroup(groupId, inviteToken)
            .then((res) => {
                setResult(res);
            })
            .catch((err) => {
                setResult({ error: err.message, isSuccess: false });
            });
    }, [groupId, inviteToken]);

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
                <Redirect groupId={groupId} />
            )}
        </>
    );
}
