import { Album } from '@/lib/define';
import Image from 'next/image';

export const AlbumItem = ({ album }: { album: Album }) => {
    return (
        <div className="rounded-2xl relative aspect-[4/3] overflow-hidden group">
            <Image
                fill
                className="w-full object-cover m-0"
                src={album?.photos[0]?.url || '/background/nobackground.png'}
                alt="veggtables"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            />
            {/* overlay */}
            <div className="absolute inset-0 from-black/95 via-black/70 to-black/10 bg-gradient-to-t"></div>
            <div className="p-4 absolute inset-0 flex flex-col justify-end size-full ">
                <h3 className="text-xl font-bold text-gray-100 tracking-tighter mt-3 mb-2 line-clamp-1">
                    {album.title}
                </h3>
                <p className="text-gray-100 line-clamp-2">
                    {album.description}
                </p>
            </div>
        </div>
    );
};
