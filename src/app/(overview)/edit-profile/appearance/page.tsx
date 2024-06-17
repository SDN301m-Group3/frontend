import { AppearanceForm } from '@/components/edit-profile/appearance/appearance-form';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Appearance',
    description:
        'Adjust the appearance of the website. Automatically switch between light and dark mode.',
};

export default function SettingsAppearancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                    Adjust the appearance of the website. Automatically switch
                    between light and dark mode.
                </p>
            </div>
            <Separator />
            <AppearanceForm />
        </div>
    );
}
