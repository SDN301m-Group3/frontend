'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { createUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchPhoto() {
    const [value, setValue] = useState('');
    const { replace } = useRouter();
    const [placeholder, setPlaceholder] = useState([
        'Search photos here',
        'Find photos by tag',
        'Find photos by title',
    ]);

    const handleSearchChange = (value: string) => {
        setValue(value);
        setPlaceholder([]);
    };

    const handleSearchSubmit = () => {
        setPlaceholder([
            'Search photos here',
            'Find photos by tag',
            'Find photos by title',
        ]);
        const searchParams = new URLSearchParams(location.search);
        const pathName = location.pathname;
        searchParams.set('search', value);
        replace(createUrl(pathName, searchParams));
    };
    return (
        <PlaceholdersAndVanishInput
            placeholders={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchChange(e.target.value)
            }
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSearchSubmit()
            }
        />
    );
}
