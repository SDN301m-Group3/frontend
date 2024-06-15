'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

const handleSearchChange = (value: string) => {
    console.log(value);
};

const handleSearchSubmit = () => {
    console.log('search submitted');
};

export default function SearchPhoto() {
    return (
        <PlaceholdersAndVanishInput
            placeholders={['Search photos here', 'Find photos by tag']}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchChange(e.target.value)
            }
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSearchSubmit()
            }
        />
    );
}
