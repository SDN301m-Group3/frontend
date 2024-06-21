import JoinedGroupList from '@/components/overview/group/joined-group-list';
import GroupList from '@/components/overview/home/group/group-list';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import SpinLoading from '@/components/shared/spin-loading';
import { BreadItem } from '@/lib/define';
import { Suspense } from 'react';

export default function GroupPage() {
    const breadItems = [
        {
            title: 'Group',
            url: '/group',
        },
    ] as BreadItem[];
    return (
        <div>
            <div className="my-2">
                <BreadcrumbComponent breadcrumbs={breadItems} />
            </div>
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
