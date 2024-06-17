'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

const handleSearchChange = (value: string) => {
    console.log(value);
};

const handleSearchSubmit = () => {
    console.log('search submitted');
};

export default function SearchAlbum() {
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
