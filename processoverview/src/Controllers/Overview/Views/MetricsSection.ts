import { int } from '@tuval/core';
import { TvChart, UIChartsView, AreaSerie, MyControlBody } from '@realmocean/charts';
import { UIView, VStack, HStack, Text, Alignment, Spacer, UIButton, Icon, ForEach, cTopLeading, useState, bindState } from '@tuval/forms';
import { MetricBox, MVIMetricBox } from './MetricBox';
import { TileBoxHeaderText } from '../../../Views/TileBoxHeaderText';
import { TileBox } from '../../../Views/TileBox';


export interface MVIMetricSection {
    metricBoxNodels: MVIMetricBox[];
    data: any[];
}
export function MetricsSection(params: MVIMetricSection): UIView {
    const [selectedIndex, setSelectedIndex] = bindState(0);
    return (
        // We want to space 10px between every vertical block
        VStack({ alignment: cTopLeading, spacing: 10 })(
            HStack(
                Text('Metrics').paddingTop('5px').height(38).fontFamily('Proxima Nova').fontSize(20).foregroundColor('#333333'),
                Spacer(),
                UIButton(
                    Icon('\\e8b8').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                )
            )
                // We prevent this stack to large more than its content
                .height(),
            HStack({ spacing: 10 })(
                ...ForEach(params?.metricBoxNodels)((metricBoxModel, index) =>
                Text('sad')
                 //MetricBox(metricBoxModel, selectedIndex === index).onClick(() => setSelectedIndex(index)),
                )
            ).height(150),
            TileBox(
                VStack({ alignment: cTopLeading })(
                    TileBoxHeaderText('Daily cases per month').marginBottom('10px'),
                    VStack(
                        UIChartsView()(
                            AreaSerie().xName('x').yName('y').border({ color: '#FBCD4E', width: 3 })
                                .marker({ visible: true, width: 10, height: 10, fill: '#FBB90A', border: { color: 'white' } })
                                .fill('#FBCD4E55')
                                .animation({
                                    enable: false
                                })
                                .data(params?.data)
                        )
                            .primaryXAxis({
                                labelStyle: {
                                    fontFamily: 'Ubuntu, sans-serif',
                                    size: '14px'
                                },
                                valueType: 'DateTime',
                                labelFormat: 'MMM',
                                majorGridLines: { width: 0 },
                                intervalType: 'Months',
                                edgeLabelPlacement: 'Shift'
                            })
                            .primaryYAxis({
                                labelStyle: {
                                    fontFamily: 'Ubuntu, sans-serif',
                                    size: '14px'
                                },
                                labelFormat: '{value}',
                                lineStyle: { width: 0 },

                                majorTickLines: { width: 0 },
                                minorTickLines: { width: 0 }
                            })
                            .backgroundColor('transparent'),
                            
                    )
                )
            ).height('300px')
        )
    )
}

