import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { GroupInfo, User } from '@/lib/define';
import { Settings } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GroupInformation from './group-info';
import { getUser } from '@/lib/action';
import GroupMembers from './group-memebers';
import GroupAlbums from './group-albums';
import { cn } from '@/lib/utils';
import GroupSetting from './group-setting';

export default async function GroupSettingDialog({
    group,
}: {
    group: GroupInfo;
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
                            group.owner._id === user?.aud
                                ? 'grid-cols-4'
                                : 'grid-cols-3'
                        )}
                    >
                        <TabsTrigger value="information">
                            Information
                        </TabsTrigger>
                        <TabsTrigger value="members">Members</TabsTrigger>
                        <TabsTrigger value="albums">Albums</TabsTrigger>
                        {group.owner._id === user?.aud && (
                            <TabsTrigger value="Setting">Setting</TabsTrigger>
                        )}
                    </TabsList>
                    <TabsContent value="information">
                        <GroupInformation group={group} user={user} />
                    </TabsContent>
                    <TabsContent value="members">
                        <GroupMembers group={group} user={user} />
                    </TabsContent>
                    <TabsContent value="albums">
                        <GroupAlbums group={group} />
                    </TabsContent>
                    <TabsContent value="Setting">
                        <GroupSetting group={group} user={user} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
