'use client';

import { PhotoDetail, User } from '@/lib/define';
import PhotoAction from './photo-action';
import { useState } from 'react';
import Comment from './comment';

export default function ActionSection({
    photo,
    user,
}: {
    photo: PhotoDetail;
    user: User;
}) {
    const [openComment, setOpenComment] = useState(false);
    return (
        <>
            <PhotoAction
                photo={photo}
                openComment={openComment}
                setOpenComment={setOpenComment}
            />
            {openComment && <Comment user={user} photo={photo} />}
        </>
    );
}
