import GroupList from '@/components/overview/home/group/group-list';

export default function GroupPage() {
    return (
        <div>
            <span className={`text-2xl font-bold`}>My Group</span>
            <GroupList />
        </div>
    );
}
