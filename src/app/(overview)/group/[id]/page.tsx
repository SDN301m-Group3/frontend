import AlbumList from '@/components/overview/group/album-list';
import CreateAlbumDialog from '@/components/overview/group/create-album-dialog';
import GroupMembers from '@/components/overview/group/group-members';
import GroupSettingDialog from '@/components/overview/group/group-setting/group-setting-dialog';
import SearchAlbum from '@/components/overview/group/search-album';
import SpinLoading from '@/components/shared/spin-loading';
import { BasicTooltip } from '@/components/shared/tool-tip';
import { Button } from '@/components/ui/button';
import { getGroupInfo } from '@/lib/data';
import { Settings } from 'lucide-react';
import { Suspense } from 'react';

export default async function GroupPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    const group = await getGroupInfo(id);

    return (
        <div className="">
            <SearchAlbum />
            <div className="my-5">
                <GroupMembers groupId={id} />
            </div>
            <div className="sm:flex sm:justify-between">
                <h1 className="text-4xl font-bold">
                    <BasicTooltip title={`Group: ${group.title}`} />
                </h1>
                <div className="flex justify-between">
                    <Button>
                        <CreateAlbumDialog groupId={id} />
                    </Button>
                    <GroupSettingDialog group={group} />
                </div>
            </div>
            <Suspense fallback={<SpinLoading />}>
                <AlbumList groupId={id} />
            </Suspense>
        </div>
    );
}
