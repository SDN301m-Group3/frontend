'use client';

import { Button } from '@/components/ui/button';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import Link from 'next/link';

export function JoinNow() {
    const words = [
        {
            text: 'Preserve',
        },
        {
            text: 'Your',
        },
        {
            text: "Group's",
        },
        {
            text: 'Memories',
        },
        {
            text: 'in One Place',
            className: 'text-blue-500 dark:text-blue-500',
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center my-10">
            <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
                Join Us and Keep Your Group's Story Alive
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                <Button
                    variant="secondary"
                    className="w-40 h-10 rounded-xl"
                    asChild
                >
                    <Link href="/login">Login</Link>
                </Button>
                <Button variant="default" className="w-40 h-10 rounded-xl">
                    <Link href="/register">Join now</Link>
                </Button>
            </div>
        </div>
    );
}
