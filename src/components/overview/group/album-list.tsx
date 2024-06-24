import { getAlbumsByGroup } from '@/lib/data';
import { AlbumItem } from './album-item';
import { SearchAlbumParams } from '@/lib/define';

export default async function AlbumList({
    groupId,
    searchParams,
}: {
    groupId: string;
    searchParams: SearchAlbumParams;
}) {
    const albums = await getAlbumsByGroup(groupId, searchParams);
    if (albums.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                No albums found
            </div>
        );
    }
    return (
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {albums.map((album) => (
                <AlbumItem key={album._id} album={album} />
            ))}
        </div>
    );
}
