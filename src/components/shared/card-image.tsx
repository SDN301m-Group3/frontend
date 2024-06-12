import { RecentImage } from '@/lib/define';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
const cardContent = {
    title: 'Lorem ipsum dolor',
    description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, hic ipsum!',
};
const CardBody = ({ className = '' }) => (
    <div className={cn('px-2 sm:px-4 py-0 sm:pb-3 text-left', className)}>
        {/* <h3 className="text-lg font-bold text-gray-100 tracking-tighter mt-3 mb-1">
            {cardContent.title}
        </h3>
        <p className="text-gray-100 text-sm">{cardContent.description}</p> */}
        <div className="font-bold text-gray-100 tracking-tighter mt-3 mb-1">
            <span className="font-bold">Group:</span>
            <span> Group name here</span>
        </div>
        <div className="flex justify-between mt-2 text-gray-100 text-sm">
            <div className="flex gap-2 items-center">
                <Avatar className="h-[30px] w-[30px] border-[1px]">
                    <AvatarImage src="/avatar/noavatar.png" alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                    <span className="font-bold">shadcn</span>
                </div>
            </div>
            <div className="flex items-center">
                {/* show time */}
                <span className="text-sm">2 hours ago</span>
            </div>
        </div>
    </div>
);
//======================================
export const CardImage = ({ image }: { image: RecentImage }) => {
    return (
        <div className="rounded-2xl relative aspect-[4/3] overflow-hidden group">
            <Image
                fill
                className="w-full object-cover m-0"
                src={image.imageUrl}
                alt="Recent Image"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            />
            {/* overlay */}
            <div className="flex flex-col justify-end h-full p-1 sm:p-2">
                <CardBody className="sm:pb-2 bg-gray-600/35 rounded-2xl backdrop-blur-lg" />
            </div>
        </div>
    );
};
