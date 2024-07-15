import { getJoinedGroups, getMyGroups } from '@/lib/data';
import { GroupItem } from '../home/group/group-item';

export default async function JoinedGroupList() {
    const groups = await getJoinedGroups();
    if (groups.length === 0) {
        return (
            <div className="flex justify-center items-center h-24">
                No group found
            </div>
        );
    }
    return (
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {groups.map((group) => (
                <GroupItem key={group._id} group={group} />
            ))}
        </div>
    );
}
