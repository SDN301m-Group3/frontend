'use client';

import { Badge } from '@/components/ui/badge';
import { createUrl } from '@/lib/utils';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBadge({ query }: { query: string }) {
    const { replace } = useRouter();

    const handleClearSearch = () => {
        const searchParams = new URLSearchParams(location.search);
        const pathName = location.pathname;
        searchParams.delete('search');
        replace(createUrl(pathName, searchParams));
    };
    return (
        <Badge variant="default">
            Search results for: {query}
            <button
                className="ml-2 text-xs text-gray-500"
                onClick={handleClearSearch}
            >
                <X className="h-4 w-4" />
            </button>
        </Badge>
    );
}
