'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);
    return (
        <>
            <div className="w-full h-[90vh] flex flex-col justify-center">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <div className="text-center text-xl">
                            Oops! Undefine error
                        </div>
                        <div className="text-center text-lg text-neutral-600">
                            Sorry, something went wrong. Please try again later.
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
                            <Button onClick={() => reset()}>Try again</Button>
                        </Link>

                        <Button
                            variant="outline"
                            onClick={() => (window.location.href = '/')}
                        >
                            Home
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error;
