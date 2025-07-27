import { getSettings } from '@/lib/settings';
import type { SiteSettings } from '@/types';
import SettingsEditor from '@/components/backoffice/SettingsEditor';

export default async function SettingsPage() {
    const settings: SiteSettings = await getSettings();

    return (
        <div>
            <SettingsEditor initialSettings={settings} />
        </div>
    );
}
