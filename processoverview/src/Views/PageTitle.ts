import { UIView, TApplication, ApplicationModes } from '@tuval/forms';
import { DesktopPageTitle } from './DesktopPageTitle';
import { PortalPageTitle } from './PortalPageTitle';

export function PageTitle(icon: string, text: string): UIView {
    if (TApplication.ApplicationMode === ApplicationModes.Desktop) {
        return DesktopPageTitle(icon, text);
    } else {
        return PortalPageTitle(icon, text);
    }
}