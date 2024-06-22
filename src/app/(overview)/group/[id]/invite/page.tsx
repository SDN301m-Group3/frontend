import AcceptInviteToGroup from '@/components/overview/group/invite/accept-invite';
import FullPageLoadingOverlay from '@/components/shared/full-page-loading-overlay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { acceptInviteToGroup } from '@/lib/action';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function AcceptInviteToGroupPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { inviteToken: string };
}) {
    return (
        <Suspense fallback={<FullPageLoadingOverlay />}>
            <AcceptInviteToGroup params={params} searchParams={searchParams} />
        </Suspense>
    );
}
