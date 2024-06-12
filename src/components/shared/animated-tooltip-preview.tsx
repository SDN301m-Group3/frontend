'use client';
import React from 'react';
import { AnimatedTooltip } from '../ui/animated-tooltip';
import { GroupMember } from '@/lib/define';

export function AnimatedTooltipPreview({ people }: { people: GroupMember[] }) {
    return (
        <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
        </div>
    );
}
