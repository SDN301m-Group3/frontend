import JoinedGroupList from '@/components/overview/group/joined-group-list';
import GroupList from '@/components/overview/home/group/group-list';
import { Suspense } from 'react';

export default function GroupPage() {
    return (
        <div>
            <span className={`text-2xl font-bold`}>My Group</span>
            <Suspense fallback={<div>Loading...</div>}>
                <GroupList />
            </Suspense>
            <span className={`text-2xl font-bold`}>Joined Group</span>
            <Suspense fallback={<div>Loading...</div>}>
                <JoinedGroupList />
            </Suspense>
        </div>
    );
}
