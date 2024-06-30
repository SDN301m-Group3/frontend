'use client';

import { Button } from '@/components/ui/button';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';

export default function PhotoLikeAction({ isLiked }: { isLiked: boolean }) {
    const [isLike, setIsLike] = useState(isLiked);
    const handleLike = () => {
        setIsLike(!isLike);
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
