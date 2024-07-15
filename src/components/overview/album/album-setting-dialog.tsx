import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AlbumInfo, User } from '@/lib/define';
import { Settings } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUser } from '@/lib/action';
import { cn } from '@/lib/utils';
import AlbumInformation from './album-info';
import AlbumMembersSetting from './album-members-setting';
import AlbumSetting from './album-setting';

export default async function AlbumSettingDialog({
    album,
}: {
    album: AlbumInfo;
}) {
    const user = (await getUser()) as User;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="hidden">
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] h-[30rem]">
                <Tabs defaultValue="information" className="w-full mt-3">
                    <TabsList
                        className={cn(
                            'grid w-full',
                            album?.owner?._id === user?.aud
                                ? 'grid-cols-3'
                                : 'grid-cols-2'
                        )}
                    >
                        <TabsTrigger value="information">
                            Information
                        </TabsTrigger>
                        <TabsTrigger value="members">Members</TabsTrigger>
                        {album?.owner?._id === user?.aud && (
                            <TabsTrigger value="Setting">Setting</TabsTrigger>
                        )}
                    </TabsList>
                    <TabsContent value="information">
                        <AlbumInformation album={album} user={user} />
                    </TabsContent>
                    <TabsContent value="members">
                        <AlbumMembersSetting album={album} user={user} />
                    </TabsContent>
                    <TabsContent value="Setting">
                    <AlbumSetting album={album} user={user} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
