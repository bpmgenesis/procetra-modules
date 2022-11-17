import { Sparkline, SparklineModel } from '@realmocean/charts';
import { Bindable } from '../Bindable';
import { UIView, VStack, Text, Alignment, TApplication, ApplicationModes, HStack, ZStack, AnimationStack, useState, cLeading, cTopLeading, UIChart, Spacer, Theme } from '@tuval/forms';


import { TileSparkLine } from './TileSparkLine';
import { TileBoxHeaderText } from '../../../Views/TileBoxHeaderText';
import { MetricBoxValueText } from '../../../Views/MetricBoxValueText';
import { CalculationMethodText } from '../../../Views/CalculationMethodText';
import { ListBounceAnimation } from '../../../ListBounceAnimation';

export interface MVIMetricBox {
    title: string,
    value: string,
    subTitle: string,
    /*   showMenu: Bindable<boolean>; */
    chart: SparklineModel
}

export function PortalMetricBox(params: MVIMetricBox, selected: boolean): UIView {
    const [showMenu, setShowMenu] = useState(false);
    return (
        ZStack(
            VStack({ alignment: cTopLeading })(
                TileBoxHeaderText(params.title),
                HStack({ alignment: cLeading })(
                    MetricBoxValueText(params.value.toString()),
                    /* Text(params.value.toString()).fontSize('40px').fontFamily('Proxima Nova, sans serif').fontWeight('500').foregroundColor('#14a9d5'), */
                    VStack({ alignment: cLeading })(
                        /* Text('monts').foregroundColor('rgb(251,192,1)').fontSize('10px').fontWeight('700'), */
                        CalculationMethodText('AVG')
                            .onClick(() => setShowMenu(true))
                            .padding()
                            .cornerRadius(5)
                            .cursor('pointer')
                            .border('dashed 1px var(--sub-border-color)')
                            .transition('border .3s')
                    )
                )
                    .paddingLeft('30px')
                    .paddingTop('10px'),
                /* VStack(
                    Text('Duration').foregroundColor('#b40404'),
                    Text('15 - 40 monts').foregroundColor('#AAA')
                )
                    .marginLeft('32px')
                    .marginBottom('5px')
                    .alignment(Alignment.leading), */

                TileSparkLine(params.chart)
                    .slFill(selected ? '#b2cfff' : 'rgb(120,120,120,30%)')
                    .slBorder(selected ? { color: '#3C78EF', width: 2 } : { color: 'gray', width: 2 })


                /*  Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
                 Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'), */
            )
                .height(148)
                .overflow('hidden')
                .backgroundColor('rgb(255,255,255,60%)')
                .cornerRadius('12px')
                .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
                .tabIndex(0)
                // Üzerine geldiğimizde alt text border için.
                .variable('--sub-border-color', { default: 'transparent', hover: '#14a9d5' }),

            AnimationStack(
                VStack(
                    Text('Mean').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(() => setShowMenu(false)),
                    Text('Median').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(() => setShowMenu(false)),
                    Text('Max').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(() => setShowMenu(false)),
                    Text('Min').cursor('pointer').width('100%').height('100%').shadow('inset 0 -1px 0 0 #e4e4e4').backgroundColor({ hover: '#f9f9f9' }).padding(10).onClick(() => setShowMenu(false)),
                )
            )

                .backgroundColor('white')
                .animation(ListBounceAnimation, '.3s')
                .visible(showMenu)
        ).margin('2px')
    )
}
export function DesktopMetricBox(params: MVIMetricBox, selected:boolean): UIView {
    return (
        VStack({ alignment: cTopLeading })(
            TileBoxHeaderText(params.title),
            //Text(params.value).padding('10px 30px 0 30px;').fontFamily('Proxima Nova').fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
            //Text(params.subTitle).paddingLeft('30px').fontFamily('Proxima Nova').fontSize('12px').foregroundColor('#666'),
            //Spacer(),
            UIChart().series([
                {
                    data: [
                        {
                            x: 1,
                            y: 10
                        },
                        {
                            x: 2,
                            y: 30
                        },
                        {
                            x: 3,
                            y: 20
                        }
                    ]
                }
            ]).options({
                    chart: {
                      type: 'area',
                     // height: 20,
                      sparkline: {
                        enabled: true
                      },
                    },
                     title: {
                        text: params.value,
                        offsetX: 20,
                        style: {
                          fontSize: '27px',
                          fontFamily:'Proxima Nova',
                          fontWeight:'500',
                          color:'#14a9d5'
                        }
                      }, 
                      subtitle: {
                        text: params.subTitle,
                        offsetX: 20,
                        style: {
                          fontSize: '12px',
                          fontFamily:'Proxima Nova',
                          color:'#666'
                        }
                      },
                    stroke: {
                      curve: 'straight',
                  
                        colors:[selected ? 'rgb(251, 205, 78)' : 'rgb(200,196,198)']
                     
                    },
                    fill: {
                        colors:[selected ? 'rgb(251, 205, 78)' : 'rgb(200,196,198)'],
                      opacity: 0.3
                    }
                  
            }).chartType('area').chartHeight(110).height()
        )
            .height('148px')
            .background(Theme.secondaryBackgroundColor)
            .cornerRadius('12px')
            .shadow({ default: '0px 3px 12px var(--application-border-color)', focus: '0 0 3px 1px #00c3ff' })
            .tabIndex(0)
            .overflow('hidden')
    )
}

export function MetricBox(params: MVIMetricBox, selected: boolean): UIView {
    if (TApplication.ApplicationMode === ApplicationModes.Desktop) {
        return DesktopMetricBox(params, selected);
    } else {
        return PortalMetricBox(params, selected);
    }
}


