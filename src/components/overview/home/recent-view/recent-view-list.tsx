import { CardImage } from '@/components/shared/card-image';
import { getRecentViewPhotos } from '@/lib/data';
import { RecentPhoto } from '@/lib/define';

const recentImage = {
    _id: 'fsdsdsd',
    imageUrl:
        'https://plus.unsplash.com/premium_photo-1683734677818-74b42347f4ca?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    openAt: '2021-12-12',
    author: {
        _id: 'sdsdsd',
        fullName: 'Nguyen Van A',
        email: 'demo@gmail.com',
        avatar: '/avatar/noavatar.png',
    },
    group: {
        _id: 'sdsdsd',
        title: 'Group name here',
    },
};

export async function RecentViewList() {
    const photos = (await getRecentViewPhotos(15)) as RecentPhoto[];

    if (photos.length === 0) {
        return (
            <div className="flex justify-center items-center h-24">
                No photos found
            </div>
        );
    }
    return (
        <div className="my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {photos.map((photo) => (
                <CardImage key={photo._id} photo={photo} />
            ))}
        </div>
    );
}
