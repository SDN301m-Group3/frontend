'use client';

import SpinLoading from '@/components/shared/spin-loading';
import ViewImages from '@/components/shared/view-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PhotoDetail } from '@/lib/define';
import { cn, fetchImageSize } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PhotoView({ photo }: { photo: PhotoDetail }) {
    const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetchImageSize(photo.url).then((size) => {
            setDimensions(size);
            setLoading(false);
        });
    }, [photo.url]);
    if (loading) {
        return <SpinLoading />;
    }
    return (
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
                <div
                    className={cn(
                        dimensions.width > dimensions.height
                            ? 'md:w-full'
                            : 'md:h-[80vh]',
                        'flex justify-center shadow-none'
                    )}
                >
                    <Image
                        className="object-contain h-full rounded-lg"
                        src={photo.url}
                        alt={photo.title || 'Photo'}
                        width={dimensions.width}
                        height={dimensions.height}
                        priority={true}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] p-0 bg-transparent border-none">
                <ViewImages image={photo.url} />
            </DialogContent>
        </Dialog>
    );
}
