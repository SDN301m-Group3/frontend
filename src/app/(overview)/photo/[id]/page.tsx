import PhotoCommentList from '@/components/overview/photo/photo-comment-list';
import ButtonShare from '@/components/shared/button-share';
import ViewImages from '@/components/shared/view-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { getDateFormatted, getFormatDistanceToNow } from '@/lib/utils';
import { Heart, HeartIcon, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const photo = {
    id: '1',
    title: 'Photo 1',
    tags: ['tag1', 'tag2'],
    url: 'https://images.unsplash.com/photo-1718125337973-59d45f9708a6?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    createdAt: '2021-09-01T00:00:00Z',
    owner: {
        id: '1',
        fullName: 'User 1',
        username: 'user1',
        email: 'test@gmail.com',
        img: 'https://plus.unsplash.com/premium_photo-1676479611971-d1aca611a087?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
};

const reacts = [
    {
        id: '1',
        type: 'like',
        owner: {
            id: '1',
            fullName: 'User 1',
            username: 'user1',
            email: '',
            createdAt: '2021-09-01T00:00:00Z',
        },
    },
];

export default function PhotoPage({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
                <Dialog>
                    <DialogTrigger asChild className="cursor-pointer">
                        <Image
                            className="object-cover rounded-lg"
                            src={photo.url}
                            alt={photo.title}
                            width={1000}
                            height={1000}
                        />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[1000px] p-0 bg-transparent border-none">
                        <ViewImages images={[photo.url]} />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                            <AvatarImage
                                src={
                                    photo?.owner?.img || '/avatar/noavatar.png'
                                }
                                alt="picture"
                            />
                            <AvatarFallback>{'A'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-around">
                            <p className="text-sm font-medium leading-none">
                                Owner: {photo?.owner?.fullName}{' '}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                Email: {photo?.owner?.email}
                            </p>
                        </div>
                    </div>
                    <Button>Download</Button>
                </div>
                <div className="my-2 flex gap-2">
                    {photo.tags.map((tag, index) => (
                        <Badge key={index}>{tag}</Badge>
                    ))}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{photo.title}</h1>
                    <p className="text-sm text-muted-foreground">
                        Upload at: {getDateFormatted(photo.createdAt)} (
                        {getFormatDistanceToNow(photo.createdAt)})
                    </p>
                </div>

                <div>
                    <div className="flex gap-4 mt-3">
                        <div className="flex gap-2 items-center">
                            <Heart className="w-4 h-4" />
                            <span>12</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MessageCircle className="w-4 h-4" />
                            <span>12</span>
                        </div>
                    </div>
                    <Separator className="mb-2 mt-2" />
                    <div className="flex justify-between md:px-10 text-sky-500">
                        <Button
                            variant="hidden"
                            className={`flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100 transition-all duration-500 ease-in-out transform ${
                                false ? 'scale-90' : ''
                            }`}
                            // onClick={handleLike}
                        >
                            {/* {isLike ? (
                        <>
                            <HeartFilledIcon className="w-7 h-7" />
                            <span className="max-md:hidden">Đã thích</span>
                        </>
                    ) : ( */}
                            <>
                                <HeartIcon className="w-7 h-7" />
                            </>
                            {/* )} */}
                        </Button>
                        <Link
                            href="#post-comment"
                            className="flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100 p-2 px-5 rounded-md"
                            // onClick={e => handleClick(e)}
                        >
                            <MessageCircle />
                        </Link>
                        <ButtonShare />
                    </div>
                    <Separator className="my-2" />
                </div>
                <div>
                    <PhotoCommentList />
                </div>
            </div>
        </div>
    );
}
