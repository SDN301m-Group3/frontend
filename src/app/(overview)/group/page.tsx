import JoinedGroupList from '@/components/overview/group/joined-group-list';
import GroupList from '@/components/overview/home/group/group-list';
import SpinLoading from '@/components/shared/spin-loading';
import { Suspense } from 'react';

export default function GroupPage() {
    return (
        <div>
            <span className={`text-2xl font-bold`}>My Group</span>
            <Suspense fallback={<SpinLoading />}>
                <GroupList />
            </Suspense>
            <span className={`text-2xl font-bold`}>Joined Group</span>
            <Suspense fallback={<SpinLoading />}>
                <JoinedGroupList />
            </Suspense>
        </div>
    );
}
