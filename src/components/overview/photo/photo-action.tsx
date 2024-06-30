import ButtonShare from '@/components/shared/button-share';
import { Separator } from '@/components/ui/separator';
import { PhotoDetail, User } from '@/lib/define';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import PhotoLikeAction from './photo-like-action';
import { getPhotoReacts } from '@/lib/data';
import CommentAction from './comment-action';
import { getUser } from '@/lib/action';

export default async function PhotoAction({ photo }: { photo: PhotoDetail }) {
    const reacts = await getPhotoReacts(photo._id);
    const user = (await getUser()) as User;

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
                <CommentAction user={user} photo={photo} />
                <ButtonShare />
            </div>
            <Separator className="my-2" />
        </div>
    );
}
