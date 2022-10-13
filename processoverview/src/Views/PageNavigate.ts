import { int } from "@tuval/core";
import { cLeading, ForEach, HStack, Icon, Spacer, UIButton, Text, NavigateFunction, TApplication, VStack, HDivider } from "@tuval/forms";
import { PageTitle } from "./PageTitle";
import { MVIPortalSideMenuItem } from "./PortalSideMenu";






export const PageNavigate = (project_id: string, selectedIndex: int, navigator: NavigateFunction) => {
    const sideMenu: MVIPortalSideMenuItem[] = [
        {
            name: 'Overview',
            icon: '\\d2de',
            url: `/app(procetra)/project/${project_id}/modules/process-overview/overview`,
            isVisible: () => true
        },
        {
            name: 'Throughput times',
            icon: '\\d36c',
            url: `/app(procetra)/project/${project_id}/modules/process-overview/throughput-times`,
            isVisible: () => true
        },
        {
            name: 'Activities',
            icon: '\\d2fd',
            url: `/app(procetra)/project/${project_id}/modules/process-overview/activities`,
            isVisible: () => true
        }
    ]

    return (
        VStack(
            HStack({ alignment: cLeading, spacing: 10 })(
                PageTitle(sideMenu[selectedIndex].icon, sideMenu[selectedIndex].name),
                Spacer(),

                // View Buttons Overview, Throuthput Times
                // Only Desktop
                HStack({ spacing: 5 })(
                    ...ForEach(sideMenu)((item: MVIPortalSideMenuItem, index: int) =>
                        UIButton(
                            Icon(item.icon).size(14).foregroundColor('gray'),
                            Text(item.name).paddingLeft('5px')
                        )
                            .action(() => navigator(item.url))
                            .border('solid 1px gray')
                            .cornerRadius('10px')
                            .padding('3px 10px 3px 10px')
                            .background(selectedIndex === index ? 'rgb(120,120,120,20%)' : '')
                    )
                )
                    .width() // auto width
                    .visible(TApplication.IsDesktop),

                // Portal
                HStack({ spacing: 30 })(
                    VStack(
                        Text('traces').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                        Text('0').foregroundColor('#999').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                    ),
                    VStack(
                        Text('events').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                        Text('0').foregroundColor('#2ca3c0').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                    ),
                    VStack(
                        Text('variants').foregroundColor('#495057').textTransform('uppercase').fontWeight('700').fontSize('14px').fontFamily('Roboto, sans-serif'),
                        Text('0').foregroundColor('#b40404').fontWeight('700').fontSize('27px').fontFamily('Roboto, sans-serif'),
                    )
                )
                    .width() //auto width
                    .visible(TApplication.IsPortal)

            ).height().paddingBottom('10px'),
            HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
        ).height()
    )
}