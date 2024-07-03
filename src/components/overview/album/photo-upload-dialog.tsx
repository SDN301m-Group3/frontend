'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import PhotoUploadForm from './photo-upload-form';

export default function PhotoUploadDialog({ albumId }: { albumId: string }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full shadow" variant="outline">
                    Upload Photo
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Upload your photo
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Share your photo with members of this album
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <PhotoUploadForm albumId={albumId} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
