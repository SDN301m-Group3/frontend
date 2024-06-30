import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

const ViewImages = ({ images }: { images: string[] }) => {
    return (
        <Carousel className="w-full">
            <CarouselContent className="">
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="w-full h-[95vh] flex justify-center shadow-none">
                            <Image
                                className="object-contain rounded-lg h-full"
                                src={image}
                                alt={`Photo ${index}`}
                                width={1000}
                                height={600}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 && (
                <>
                    <CarouselPrevious />
                    <CarouselNext />
                </>
            )}
        </Carousel>
    );
};

export default ViewImages;
