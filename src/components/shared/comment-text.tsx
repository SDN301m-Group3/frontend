'use client';

import React, { useState } from 'react';
import { Badge } from '../ui/badge';

export default function CommentText({ comment }: { comment: string }) {
    const [isShowMore, setIsShowMore] = useState(false);
    const [displayedText, setDisplayedText] = useState<string>('');

    // Function to toggle show more/show less
    const toggleShowMore = () => {
        setIsShowMore(!isShowMore);
    };

    React.useEffect(() => {
        if (isShowMore) {
            setDisplayedText(comment);
        } else {
            if (comment.length <= 150) {
                setDisplayedText(comment);
            } else {
                setDisplayedText(comment.slice(0, 150) + '...');
            }
        }
    }, [comment, isShowMore]);

    return (
        <>
            <div className="break-words whitespace-pre-wrap">
                {displayedText}
            </div>
            {comment.length > 150 && (
                <Badge
                    className="cursor-pointer font-normal"
                    variant="outline"
                    onClick={toggleShowMore}
                >
                    {isShowMore ? 'Show less' : 'Show more'}
                </Badge>
            )}
        </>
    );
}
