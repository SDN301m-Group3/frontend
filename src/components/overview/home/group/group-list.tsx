import { getMyGroups } from '@/lib/data';
import { GroupItem } from './group-item';

export default async function GroupList() {
    const groups = await getMyGroups();
    if (groups.length === 0) {
        return (
            <div className="text-center">
                <p className="mt-2">No group found</p>
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
