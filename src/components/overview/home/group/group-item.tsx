import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';
import { Group } from '@/lib/define';
import Link from 'next/link';

export function GroupItem({ group }: { group: Group }) {
    const imageUrl =
        'https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    return (
        <Link
            className=" flex items-center justify-center"
            href={`/group/${group._id}`}
        >
            <DirectionAwareHover imageUrl={imageUrl}>
                <p className="font-bold text-xl line-clamp-1">
                    Group: {group.title}
                </p>
                <p className="font-normal text-sm">
                    Owner: {group.owner.fullName} ({group.owner.email})
                </p>
                <p className="font-normal text-sm">
                    {group.numberOfMembers} members - {group.numberOfAlbums}{' '}
                    albums
                </p>
                <p className="font-normal text-sm line-clamp-2">
                    {group.description}
                </p>
                {/* <p className="font-normal text-sm">12 members - 125 pictures</p> */}
            </DirectionAwareHover>
        </Link>
    );
}
