import AcceptInviteToGroup from '@/components/overview/group/invite/accept-invite';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Accept Invite to Group',
    description: 'Accept Invite to Group',
};

export default function AcceptInviteToGroupPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { inviteToken: string };
}) {
    return (
        <AcceptInviteToGroup
            groupId={params.id}
            inviteToken={searchParams.inviteToken}
        />
    );
}
