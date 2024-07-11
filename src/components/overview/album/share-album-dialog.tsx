import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlbumInfo, User } from '@/lib/define';
import { Share } from 'lucide-react';
import { ShareAlbumForm } from './share-album-form';

export function ShareAlbumDialog({
    album,
    user,
}: {
    album: AlbumInfo;
    user: User;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Share className="w-6 h-6" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share album {album.title}</DialogTitle>
                    <DialogDescription>
                        Share this album with people who don&apos;t have an
                        account by providing them with the album link. They will
                        be able to view the gallery mode without needing to sign
                        in.
                    </DialogDescription>
                </DialogHeader>
                <ShareAlbumForm album={album} user={user} />
            </DialogContent>
        </Dialog>
    );
}
