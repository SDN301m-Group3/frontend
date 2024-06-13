import AlbumList from '@/components/overview/group/album-list';
import GroupMembers from '@/components/overview/group/group-members';
import SearchAlbum from '@/components/overview/group/search-album';
import { BasicTooltip } from '@/components/shared/tool-tip';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

const handleSearchChange = (value: string) => {
    console.log(value);
};

const handleSearchSubmit = () => {
    console.log('search submitted');
};

export default function GroupPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <div className="">
            <SearchAlbum />
            <div className="my-5">
                <GroupMembers groupId={id} />
            </div>
            <div className="sm:flex sm:justify-between">
                <h1 className="text-4xl font-bold">
                    <BasicTooltip title={`Group ${id}`} />
                </h1>
                <Button>Create new album</Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <AlbumList groupId={id} />
            </Suspense>
            {/* <SearchForm commands={commands} /> */}
            {/* <GalleryGrid images={results.resources} /> */}
        </div>
    );
}
