import { RecentImage, RecentPhoto } from '@/lib/define';
import { cn, getFormatDistanceToNow } from '@/lib/utils';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { BasicTooltip } from './tool-tip';
import Link from 'next/link';
const cardContent = {
    title: 'Lorem ipsum dolor',
    description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum!',
};
const CardBody = ({
    className = '',
    photo,
}: {
    className: string;
    photo: RecentPhoto;
}) => (
    <div className={cn('px-2 sm:px-4 py-0 sm:pb-3 text-left', className)}>
        <div className="font-bold text-gray-100 tracking-tighter mt-3 mb-1 line-clamp-1">
            <BasicTooltip title={`Album: ${photo.photo.album.title}`} />
        </div>
        <div className="flex justify-between mt-2 text-gray-100 text-sm">
            <div className="flex gap-2 items-center">
                <Avatar className="h-[30px] w-[30px] border-[1px]">
                    <AvatarImage
                        src={photo.photo.owner?.img || '/avatar/noavatar.png'}
                        alt="avatar"
                    />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="text-sm line-clamp-1">
                    <span className="font-bold">
                        <BasicTooltip
                            title={`${photo.photo.owner.fullName}(
                        ${photo.photo.owner.username})`}
                        />
                    </span>
                </div>
            </div>
            <div className="flex items-center">
                {/* show time */}
                <span className="text-sm line-clamp-1">
                    <BasicTooltip
                        title={getFormatDistanceToNow(photo.updatedAt)}
                    />
                </span>
            </div>
        </div>
    </div>
);
//======================================
export const CardImage = ({ photo }: { photo: RecentPhoto }) => {
    return (
        <Link
            href={`/photo/${photo.photo._id}`}
            className="rounded-2xl relative aspect-[4/3] overflow-hidden group"
        >
            <Image
                fill
                className="w-full object-cover m-0"
                src={photo.photo.url}
                alt="Recent Image"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            />
            {/* overlay */}
            <div className="flex flex-col justify-end h-full p-1 sm:p-2">
                <CardBody
                    className="pb-1 sm:pb-2 bg-gray-600/35 rounded-2xl backdrop-blur-lg"
                    photo={photo}
                />
            </div>
        </Link>
    );
};
