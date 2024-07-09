'use client';

import ButtonShare from '@/components/shared/button-share';
import { Separator } from '@/components/ui/separator';
import { PhotoDetail } from '@/lib/define';
import { Heart, MessageCircle } from 'lucide-react';
import PhotoLikeAction from './photo-like-action';

export default function PhotoAction({
    photo,
    openComment,
    setOpenComment,
}: {
    photo: PhotoDetail;
    openComment: boolean;
    setOpenComment: (openComment: boolean) => void;
}) {
    return (
        <div>
            <div className="flex gap-4 mt-3">
                <div className="flex gap-2 items-center">
                    <Heart className="w-4 h-4" />
                    <span>{photo.totalReact}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <MessageCircle className="w-4 h-4" />
                    <span>{photo.totalComment}</span>
                </div>
            </div>
            <Separator className="mb-2 mt-2" />
            <div className="flex justify-between md:px-10 text-sky-500">
                <PhotoLikeAction isLiked={photo.isReacted} photo={photo} />
                {/* <CommentAction user={user} photo={photo} /> */}
                <div
                    className="flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100 p-2 px-5 rounded-md cursor-pointer"
                    onClick={() => setOpenComment(!!!openComment)}
                >
                    <MessageCircle />
                </div>
                <ButtonShare />
            </div>
            <Separator className="my-2" />
        </div>
    );
}
