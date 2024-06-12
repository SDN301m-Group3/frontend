'use client';

import { Button } from '@/components/ui/button';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

const handleSearchChange = (value: string) => {
    console.log(value);
};

const handleSearchSubmit = () => {
    console.log('search submitted');
};

export default function AlbumPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const commands = [
        { value: 'calendar', label: 'Calendar' },
        { value: 'search-emoji', label: 'Search Emoji' },
        { value: 'calculator', label: 'Calculator' },
    ];
    return (
        <section>
            <div className="flex flex-col gap-8">
                <PlaceholdersAndVanishInput
                    placeholders={['Search images here', 'Find images by tag']}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSearchChange(e.target.value)
                    }
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        handleSearchSubmit()
                    }
                />
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Album {id}</h1>
                    <Button>Upload</Button>
                </div>

                {/* <SearchForm commands={commands} /> */}
                {/* <GalleryGrid images={results.resources} /> */}
            </div>
        </section>
    );
}
