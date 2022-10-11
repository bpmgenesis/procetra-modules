import { UIView, VStack, HStack, Text, Spacer, UIButton, Icon, Alignment, cTop, cTopLeading, ZStack, AnimationStack, ForEach, bindState } from '@tuval/forms';
import { RegularText } from '../../../Views/RegularText';
import { SectionHeadline } from '../../../Views/SectionHeadline';
import { SectionSubHeadline } from '../../../Views/SectionSubHeadline';
import { TileBox } from '../../../Views/TileBox';
import { ChartView, ChartViewClass, BarSerie, AreaSerie } from '@realmocean/charts';

function DurationHeadline(value: string): UIView {
    return (
        RegularText(value)
            .cursor('pointer')
            .border('dashed 1px var(--sub-border-color)')
            .transition('border .3s')
    )
}

function DurationText(value: string): UIView {
    return (
        RegularText(value).fontSize(40).foregroundColor('#666')
    )
}

function DurationUnitText(value: string): UIView {
    return (
        RegularText(value).fontSize(20).foregroundColor('#666')
            .cursor('pointer')
            .border('dashed 1px var(--sub-border-color)')
            .transition('border .3s')
    )
}

function ProcessStartEnd(): UIView {
    return (
        HStack({ spacing: 10 })(
            RegularText('Process start').fontWeight('bold').foregroundColor('#555'),
            Icon('\\f084').size(20).marginBottom('3px'),
            RegularText('Process end').fontWeight('bold').foregroundColor('#555')
        )
            .cursor('pointer')
            .border({ default: 'dashed 1px var(--sub-border-color)', hover: 'solid 1px #2ca3c0' })
            .height() //auto
            .width() //auto
    )
}

export function ThroughputTimeSection(data: any[]): UIView {
    const [showMenu, setShowMenu] = bindState(false)
    return (
        VStack({ alignment: cTopLeading })(
            HStack(
                SectionHeadline('Throughput Time Search'),
                Spacer(),
                UIButton(
                    Icon('\\e8b8').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                )
            )
                // We prevent this stack to large more than its content
                .height(),
            SectionSubHeadline('Select any two activities to see throughput time between them'),

            ZStack(
                TileBox(
                    VStack({ alignment: cTop })(
                        DurationHeadline('Average Throughput time').onClick(() => setShowMenu(true)),
                        HStack(
                            DurationText('24'),
                            DurationUnitText('Days')
                        ),
                        ProcessStartEnd()
                    )
                        .padding(10)
                        .height(),
                    VStack(
                        ChartView()(
                            BarSerie().xName('x').yName('y')
                                .columnWidth(0.5)
                                .fill('#FFD062')
                                .animation({
                                    enable: false,
                                })
                                .data(data)
                        )
                            .xAxis({
                                labelStyle: {
                                    fontFamily: 'Ubuntu, sans-serif',
                                    size: '14px'
                                },
                                valueType: 'Category',
                                labelFormat: 'MMM',
                                majorGridLines: { width: 0 },
                                intervalType: 'Months'
                            })
                            .yAxis({
                                labelStyle: {
                                    fontFamily: 'Ubuntu, sans-serif',
                                    size: '14px'
                                },
                                labelFormat: '{value}',
                                lineStyle: { width: 0 },

                                majorTickLines: { width: 0 },
                                minorTickLines: { width: 0 }
                            })

                            .backgroundColor('transparent')
                    ).height(325)
                ).height().variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }),
                AnimationStack(
                    VStack(
                        ...ForEach(['Average', 'Median', 'Sum', 'Maximum', 'Minimum'])((name, index) =>
                            Text(name).cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' })
                                .padding(10)
                                .onClick(() => { /* this.selectedIndex = index; */ setShowMenu(false) }),
                        )
                    )
                )
                    .initial({ y: 20, opacity: 0 }).animate({ y: 0, opacity: 1 }).__transition({ type: "spring", bounce: 0.3 })
                    .overflow('hidden')
                    .backgroundColor('white')
                    // .animation(ListBounceAnimation, '.3s')
                    .visible(showMenu)
            ).overflow('hidden').minHeight('475px').cornerRadius(12)

        ).height()
        // We want to space 10px between every vertical block

    )
}