'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { createUrl } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function ToggleView() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { push } = useRouter();
    const mode = searchParams.get('mode') || 'list';
    const handleClick = () => {
        const newMode = mode == 'list' ? 'gallery' : 'list';
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('mode', newMode);
        push(createUrl(pathName, newSearchParams));
    };
    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={mode == 'gallery'}
                onClick={handleClick}
                id="view-mode"
            />
            <Label htmlFor="view-mode">View Mode</Label>
        </div>
    );
}
