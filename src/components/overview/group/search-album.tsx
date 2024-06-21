'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { createUrl } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const handleSearchChange = (value: string) => {
    console.log(value);
};

const handleSearchSubmit = () => {
    console.log('search submitted');
};

export default function SearchAlbum() {
    const [value, setValue] = useState('');
    const { replace } = useRouter();
    const [placeholder, setPlaceholder] = useState([
        'Search album here',
        'Find album by title',
        'Find album by description',
    ]);

    const handleSearchChange = (value: string) => {
        setValue(value);
        setPlaceholder([]);
    };

    const handleSearchSubmit = () => {
        setPlaceholder([
            'Search album here',
            'Find album by title',
            'Find album by description',
        ]);
        const searchParams = new URLSearchParams(location.search);
        const pathName = location.pathname;
        searchParams.set('search', value);
        replace(createUrl(pathName, searchParams));
    };
    return (
        <PlaceholdersAndVanishInput
            placeholders={[
                'Search album here',
                'Find album by title',
                'Find album by description',
            ]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchChange(e.target.value)
            }
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSearchSubmit()
            }
        />
    );
}
