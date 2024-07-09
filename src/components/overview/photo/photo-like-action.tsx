'use client';

import { useSocket } from '@/components/socket-io-provider';
import { Button } from '@/components/ui/button';
import { reactPhoto } from '@/lib/action';
import { PhotoDetail } from '@/lib/define';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PhotoLikeAction({
    isLiked,
    photo,
}: {
    isLiked: boolean;
    photo: PhotoDetail;
}) {
    const { socket } = useSocket();
    const [isLike, setIsLike] = useState(isLiked);
    const handleLike = async () => {
        try {
            const result = await reactPhoto(photo._id);
            if (!result?.isSuccess) {
                toast.error(result?.error);
            } else {
                setIsLike(!isLike);
                if (socket) {
                    socket.emit('sendNotification', result?.data);
                }
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    return (
        <Button
            variant="hidden"
            className={`flex gap-2 items-center hover:text-sky-600 hover:dark:bg-gray-700 hover:bg-sky-100 transition-all duration-500 ease-in-out transform ${
                false ? 'scale-90' : ''
            }`}
            onClick={handleLike}
        >
            {isLike ? (
                <>
                    <HeartFilledIcon className="w-7 h-7" />
                    <span className="max-md:hidden">Liked</span>
                </>
            ) : (
                <>
                    <HeartIcon className="w-7 h-7" />
                </>
            )}
        </Button>
    );
}
