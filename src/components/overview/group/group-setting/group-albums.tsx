import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { GroupInfo } from '@/lib/define';

export default function GroupAlbums({ group }: { group: GroupInfo }) {
    if (!group.albums.length) {
        return (
            <Card>
                <CardContent className="mt-5">
                    <p className="text-sm font-medium leading-none">
                        No albums found
                    </p>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card>
            <CardContent className="mt-5">
                <ScrollArea className="h-72">
                    {group.albums.map(album => (
                        <div key={album._id} className="mb-2">
                            <div className="flex flex-col gap-2 justify-around">
                                <p className="text-sm font-medium leading-none line-clamp-1">
                                    {album.title}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground line-clamp-2">
                                    {album.description}
                                </p>
                            </div>
                            <Separator className="my-4" />
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
