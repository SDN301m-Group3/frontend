import Gallery from '@/components/shared/gallery-images';
import ListPagination from '@/components/shared/list-pagination';
import { getPhotosByAlbumId } from '@/lib/data';
import { SearchPhotoParams } from '@/lib/define';

export default async function GalleryView({
    _id,
    searchParams,
}: {
    _id: string;
    searchParams: SearchPhotoParams;
}) {
    const { photos, pageMeta } = await getPhotosByAlbumId(_id, searchParams);
    return (
        <>
            <div>
                <Gallery photos={photos} />
            </div>
            <div>
                <ListPagination meta={pageMeta} bookmark="album-name" />
            </div>
        </>
    );
}
