'use client';
import { LayoutGrid } from '@/components/ui/layout-grid';
import React, { useState, useRef, useEffect } from 'react';

export function LayoutGridDemo() {
    return (
        <div className="h-screen w-full">
            <LayoutGrid cards={cards} />
        </div>
    );
}

const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">
                Capture and Cherish Every Moment Together
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Easily store and organize your group's photos in one secure
                place.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">
                Preserve Your Group's Memories in One Place
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Create a beautiful, shared album for all your unforgettable
                moments
            </p>
        </div>
    );
};
const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">
                The Ultimate Photo Hub for Your Crew
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Keep all your group’s photos safe, organized, and accessible
                anytime.
            </p>
        </div>
    );
};
const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">
                Relive the Best Moments with Your Friends
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Share and enjoy your group’s favorite memories, all in one app.
            </p>
        </div>
    );
};

const cards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: 'md:col-span-2',
        thumbnail:
            'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: 'col-span-1',
        thumbnail:
            'https://images.unsplash.com/photo-1534531688091-a458257992cb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: 'col-span-1',
        thumbnail:
            'https://plus.unsplash.com/premium_photo-1683734677818-74b42347f4ca?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 4,
        content: <SkeletonFour />,
        className: 'md:col-span-2',
        thumbnail:
            'https://images.unsplash.com/photo-1516553174826-d05833723cd4?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];
