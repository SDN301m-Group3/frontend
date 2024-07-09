'use client';

import AcceptInviteToAlbum from '@/components/overview/album/invite/accept-invite';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AcceptInviteToAlbumPage({
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
            <h1>Accept Invite to Album</h1>
            {showAcceptInvite ? (
                <AcceptInviteToAlbum
                    albumId={params.id}
                    inviteToken={searchParams.inviteToken}
                />
            ) : (
                <Button onClick={handleAcceptInviteClick} className="my-2">
                    Join Album
                </Button>
            )}
        </div>
    );
}
