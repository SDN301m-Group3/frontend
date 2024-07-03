'use client';

import AcceptInviteToGroup from '@/components/overview/group/invite/accept-invite';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AcceptInviteToGroupPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { inviteToken: string };
}) {
    const [showAcceptInvite, setShowAcceptInvite] = useState(false);

    const handleAcceptInviteClick = () => {
        setShowAcceptInvite(true);
    };

    return (
        <div className="text-center">
            <h1>Accept Invite to Group</h1>
            {showAcceptInvite ? (
                <AcceptInviteToGroup
                    groupId={params.id}
                    inviteToken={searchParams.inviteToken}
                />
            ) : (
                <Button onClick={handleAcceptInviteClick} className="my-2">
                    Join Group
                </Button>
            )}
        </div>
    );
}
