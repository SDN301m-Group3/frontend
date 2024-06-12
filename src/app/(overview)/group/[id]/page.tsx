'use client';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

const handleSearchChange = (value: string) => {
    console.log(value);
};

const handleSearchSubmit = () => {
    console.log('search submitted');
};

export default function GroupPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <div className="flex flex-col gap-8">
            <PlaceholdersAndVanishInput
                placeholders={['Search album here', 'Find album by name']}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearchChange(e.target.value)
                }
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                    handleSearchSubmit()
                }
            />
            <span className={`text-2xl font-bold`}>Group {id}</span>
        </div>
    );
}
