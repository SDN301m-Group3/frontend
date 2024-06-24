import AcceptInviteToGroup from '@/components/overview/group/invite/accept-invite';

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
