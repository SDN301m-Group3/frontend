import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { active } from '@/lib/action';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Active',
    description: 'Active page',
};

export default async function Page({
    params,
    searchParams,
}: {
    params: { token: string };
    searchParams: { active: string };
}) {
    const result = await active(params.token, searchParams.active);

    return (
        <>
            {result.isSuccess ? (
                <Alert>
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary">
                        Congratulations
                    </AlertTitle>
                    <AlertDescription className="text-primary">
                        {result?.message || 'Unknown message'}
                    </AlertDescription>
                </Alert>
            ) : (
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {result?.error || 'Unknown error'}
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
}
