import { getAlbumsByGroup } from '@/lib/data';
import { AlbumItem } from './album-item';

export default async function AlbumList({ groupId }: { groupId: string }) {
    const albums = await getAlbumsByGroup('groupId');
    return (
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {albums.map(album => (
                <AlbumItem key={album._id} album={album} />
            ))}
        </div>
    );
}
