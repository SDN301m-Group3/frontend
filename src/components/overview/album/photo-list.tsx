import PhotoItem from './photo-item';
import { PageMeta, Photo, SearchPhotoParams } from '@/lib/define';
import ListPagination from '@/components/shared/list-pagination';
import { getPhotosByAlbumId } from '@/lib/data';

const buildPhotoItems = (photos: Photo[]) => {
    let items = [];
    for (let index = 1; index < 5; index++) {
        items.push(
            <div key={index} className="flex flex-col justify-start gap-4">
                {photos
                    .filter((photo, photoIndex) => {
                        return photoIndex % 4 === index - 1;
                    })
                    .map((filteredPhoto) => (
                        <PhotoItem
                            key={filteredPhoto._id}
                            image={filteredPhoto.url}
                            _id={filteredPhoto._id}
                            title={filteredPhoto.title}
                        />
                    ))}
            </div>
        );
    }
    return items;
};
const PhotoList = async ({
    _id,
    searchParams,
}: {
    _id: string;
    searchParams: SearchPhotoParams;
}) => {
    const { photos, pageMeta } = await getPhotosByAlbumId(_id, searchParams);
    if (photos.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                No photos found
            </div>
        );
    }
    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-5">
                {buildPhotoItems(photos)}
            </div>
            <div className="my-3">
                <ListPagination meta={pageMeta} bookmark="album-name" />
            </div>
        </>
    );
};

export default PhotoList;
