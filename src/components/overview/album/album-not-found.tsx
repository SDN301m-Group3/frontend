'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const AlbumNotFound = () => {
    return (
        <>
            <div className="w-full h-[90vh] flex flex-col justify-center">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <div className="text-center text-xl">
                            Oops! The album you are looking for does not exist
                        </div>
                        <div className="text-center text-lg text-neutral-600">
                            The album you are looking for may have been removed
                            or does not exist.
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <Image
                            src="/not-found/404.png"
                            alt="404 Not Found"
                            width={300}
                            height={300}
                            className="rounded-md object-cover"
                        />
                    </div>
                    <div className="flex justify-center gap-3">
                        <Link href="">
                            <Button onClick={() => window.location.reload()}>
                                Try again
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline">Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AlbumNotFound;
