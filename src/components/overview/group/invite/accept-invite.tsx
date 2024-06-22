import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { acceptInviteToGroup } from '@/lib/action';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Redirect from './redirect-to-group';

export default async function AcceptInviteToGroup({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { inviteToken: string };
}) {
    const result = await acceptInviteToGroup(
        params.id,
        searchParams.inviteToken
    );
    console.log(result);
    if (!result?.isSuccess) {
        return (
            <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {result?.error || 'Unknown error'}
                </AlertDescription>
            </Alert>
        );
    }
    return <Redirect groupId={params.id} />;
}
