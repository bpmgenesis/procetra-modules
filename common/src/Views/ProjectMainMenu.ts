import { HStack, cLeading, Icon, VStack, UIContextMenu, ForEach, Text, cHorizontal, VDivider, HDivider, Spacer, TApplication, UIImage, PositionTypes } from '@tuval/forms';
import { int } from '@tuval/core';
import { Resources } from '../Resources/Resources';
import { AnimHeadline5, RegularText } from './Texts';

const miningModules = [
    {
        icon: '\\d2dc',
        name: 'Process Overview'
    },
    {
        icon: '\\d2db',
        name: 'Dashboard'
    },
    {
        icon: '\\d320',
        name: 'Discover'
    },
]
/***
 * Proje sayfalarının başlığı, menulerin sorumlusu
 */
export const ProjectMainMenu = (
    project_name: string,
    model_name: string,
    eventCount: int,
    caseCount: int,
    miningModels: any[],
    OnMiningModelChanged: Function, menu: any[],
    modelMenu: any[],
    queryMenu: any[]) => (
    VStack(
        HStack(
            UIImage(Resources.Icons.ApplicationIcon).width(25).opacity(0.8).position(PositionTypes.Absolute).left('10px').top('10px'),
            Text('Procetra').fontSize(16).fontWeight('700')
        ).height(40),
        HStack({ alignment: cLeading, spacing: 10 })(
            Icon('\\d1fd').size(30).marginBottom('10px'),
            VStack({ alignment: cLeading })(
                AnimHeadline5(project_name).lineHeight(35).whiteSpace('nowrap'),
                UIContextMenu(
                    ...ForEach(miningModules)(item =>
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon(item.icon).size(20),
                            Text(item.name).onClick(() => OnMiningModelChanged(item))
                        ).padding(10)
                    )
                )(
                    RegularText(model_name).whiteSpace('nowrap')
                )
                    .cornerRadius(5)
                    .paddingRight('5px').cursor('pointer')
                    .border('dotted 1px var(--sub-border-color)'),
            ).marginLeft('5px').marginRight('10px').width(),
            VDivider().width(1).height('60%').backgroundColor('rgb(120,120,120,50%)'),
            HStack({ spacing: 10 })(
                UIContextMenu(
                    ...ForEach(menu)(item =>
                        item.seperator ?
                            HDivider()
                            :
                            HStack({ alignment: cLeading, spacing: 10 })(
                                RegularText(item.title)
                                    .padding(cHorizontal, 16)
                            )
                                .minHeight(32)

                    )
                )(
                    HStack(
                        RegularText('Project').fontSize(16).fontWeight('500'),
                        Icon('\\e5c5').size(16)
                    )
                        .padding(3)
                        .padding(cHorizontal, 8)
                        .paddingLeft('14px')
                        .transition('all .3s cubic-bezier(0.55, 0, 0.55, 0.2)')
                        .backgroundColor({ focus: 'rgb(120,120,120,30%)' }).tabIndex(0)

                ).cursor('pointer').border('dotted 1px var(--sub-border-color)').transition('border .3s').cornerRadius(5).overflow('hidden'),
                UIContextMenu(
                    ...ForEach(modelMenu)(menuItem =>
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon(menuItem.icon).size(16),
                            Text(menuItem.title)
                        ).onClick(() => { menuItem.onClick(menuItem) })
                    )
                )(
                    HStack(
                        RegularText('Model').fontSize(16).fontWeight('500'),
                        Icon('\\e5c5').size(16)
                    ).padding(3).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0)
                ).cursor('pointer').border('dotted 1px var(--sub-border-color)').transition('border .3s').cornerRadius(5),

                // Query Menu
                UIContextMenu(
                    ...ForEach(queryMenu)(menuItem =>
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon(menuItem.icon).size(16),
                            Text(menuItem.title)
                        )
                    )
                )(
                    HStack(
                        RegularText('Query').fontSize(16).fontWeight('500'),
                        Icon('\\e5c5').size(16)
                    ).padding(3).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0)
                ).cursor('pointer').border('dotted 1px var(--sub-border-color)').transition('border .3s').cornerRadius(5)
            ).width().height(), //auto,
            VDivider().width(1).height('60%').backgroundColor('rgb(120,120,120,50%)'),
            Icon('\\e153').size(24).foregroundColor('#666'),
            VStack({ alignment: cLeading })(
                RegularText(eventCount.toLocaleString('en-EN')).fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(25).foregroundColor('#666').lineHeight('1em'),
                RegularText('EVENTS').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(14).foregroundColor('#666'),
            ).width(),
            VDivider().height('60%').backgroundColor('rgb(120,120,120,50%)'),
            Icon('\\d25b').size(24).foregroundColor('#666'),
            VStack({ alignment: cLeading })(
                RegularText(caseCount.toLocaleString('en-EN')).fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(25).foregroundColor('#666').lineHeight('1em'),
                RegularText('CASES').fontFamily("'Source Sans Pro', Arial, sans-serif").fontWeight('600').fontSize(14).foregroundColor('#666'),
            ).width(),
            Spacer(),
            HStack({ spacing: 10 })(
                UIContextMenu(
                    ...ForEach(menu)(item =>
                        HDivider()
                        /*  item.seperator ?
                             HDivider()
                             :
                             HStack({ alignment: cLeading, spacing: 10 })(
                                 RegularText(item.title)
                             ) */
                    )

                )(
                    HStack(
                        RegularText('Project').fontSize(16).fontWeight('500'),
                        Icon('\\e5c5').size(16)
                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),
                UIContextMenu(
                    ...ForEach(modelMenu)(menuItem =>
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon(menuItem.icon).size(16),
                            Text(menuItem.title)
                        ).onClick(() => { menuItem.onClick(menuItem) })
                    )
                )(
                    HStack(
                        RegularText('Model').fontSize(16).fontWeight('500'),
                        Icon('\\e5c5').size(16)
                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s'),

                // Query Menu
                UIContextMenu(
                    ...ForEach(queryMenu)(menuItem =>
                        HStack({ alignment: cLeading, spacing: 10 })(
                            Icon(menuItem.icon).size(16),
                            Text(menuItem.title)
                        )
                    )
                )(
                    HStack(
                        RegularText('Query').fontSize(16).fontWeight('500'),
                        Icon('\\e5c5').size(16)
                    ).padding(5).backgroundColor({ focus: 'rgb(120,120,120,50%)' }).tabIndex(0).cornerRadius(5)
                ).cursor('pointer').border('solid 1px var(--sub-border-color)').transition('border .3s')
            ).visible(false).width(), //auto,
        )
            .height(80)
            .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' })
    )
        .height()
        .background('rgb(255,255,255,20%)')
        .marginBottom('10px')
        .shadow('0 0 8px 0 #ccc')
        .visible(TApplication.IsDesktop)

)