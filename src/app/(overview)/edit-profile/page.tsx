import { EditProfileForm } from '@/components/overview/edit-profile/edit-profile-form';
import { Separator } from '@/components/ui/separator';
// import { getUserLoginProfile } from '@/lib/data';

export default async function SettingsProfilePage() {
    // const user = await getUserLoginProfile();
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <EditProfileForm />
        </div>
    );
}
