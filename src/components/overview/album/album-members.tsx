import { AnimatedTooltipPreview } from '@/components/shared/animated-tooltip-preview';
import { getAlbumMembers } from '@/lib/data';

export default async function AlbumMembers({ albumId }: { albumId: string }) {
    const members = await getAlbumMembers(albumId);
    return <AnimatedTooltipPreview people={members} />;
}
