import { AnimatedTooltipPreview } from '@/components/shared/animated-tooltip-preview';
import { getGroupMembers } from '@/lib/data';

export default async function GroupMembers({ groupId }: { groupId: string }) {
    const members = await getGroupMembers(groupId);
    return <AnimatedTooltipPreview people={members} />;
}
