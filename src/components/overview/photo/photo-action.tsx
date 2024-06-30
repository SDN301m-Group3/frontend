import ButtonShare from '@/components/shared/button-share';
import { Separator } from '@/components/ui/separator';
import { PhotoDetail } from '@/lib/define';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import PhotoLikeAction from './photo-like-action';
import { getPhotoReacts } from '@/lib/data';

export default async function PhotoAction({ photo }: { photo: PhotoDetail }) {
    const reacts = await getPhotoReacts(photo._id);

    return (
        <div>
            <div className="flex gap-4 mt-3">
                <div className="flex gap-2 items-center">
                    <Heart className="w-4 h-4" />
                    <span>{reacts.length}</span>
                </div>
                {/* <div className="flex gap-2 items-center">
                    <MessageCircle className="w-4 h-4" />
                    <span>12</span>
                </div> */}
            </div>
            <Separator className="mb-2 mt-2" />
            <div className="flex justify-between md:px-10 text-sky-500">
                <PhotoLikeAction isLiked={true} />
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
    );
}
