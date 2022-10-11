import { ActivityController } from "../Controllers/Activity/ActivityController";
import { MultiOverviewController } from "../Controllers/Overview/MultiOverviewController";
import { OverviewController } from "../Controllers/Overview/OverviewController";
import { MVIPortalSideMenuItem } from '@procetra/common';

export const sideMenuModel: MVIPortalSideMenuItem[] = [
    {
        name: 'Overview',
        icon: '\\d300',
        controller: new MultiOverviewController(),
        isVisible: () => true
    },
    {
        name: 'Activity',
        icon: '\\d30f',
        controller: new ActivityController(),
        isVisible: () => true
    },
    {
        name: 'Resource',
        icon: '\\e7fd',
        controller: new OverviewController(),
        isVisible: () => true
    }
]