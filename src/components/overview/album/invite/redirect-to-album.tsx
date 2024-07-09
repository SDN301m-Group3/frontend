'use client';

import { useRouter } from 'next/navigation';

export default function Redirect({ albumId }: { albumId: string }) {
    const router = useRouter();
    router.push(`/album/${albumId}`);

    return null;
}
