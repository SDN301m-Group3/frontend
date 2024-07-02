'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { cn, fetchImageSize } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SpinLoading from './spin-loading';

const ViewImages = ({ image }: { image: string }) => {
    const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetchImageSize(image).then((size) => {
            setDimensions(size);
            setLoading(false);
        });
    }, [image]);
    if (loading) {
        return <SpinLoading />;
    }
    return (
        <Carousel className="w-full shadow-none">
            <CarouselContent className="">
                <CarouselItem>
                    <div
                        className={cn(
                            dimensions.width > dimensions.height
                                ? 'md:w-full'
                                : 'h-[95vh]',
                            'flex justify-center shadow-none'
                        )}
                    >
                        <Image
                            className="object-contain rounded-lg h-full"
                            src={image}
                            alt={`Photo`}
                            width={dimensions.width || 1000}
                            height={dimensions.height || 1000}
                        />
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
};

export default ViewImages;
