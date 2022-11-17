import { int, Convert } from '@tuval/core';
import {
    cBottom,
    cLeading,
    Gauge,
    HDivider,
    HStack,
    Range,
    RoundedRectangle,
    Text,
    UIView,
    VDivider,
    VStack,
    UISkeleton,
    Theme
} from '@tuval/forms';

import { TileBoxHeaderText } from '../../../Views/TileBoxHeaderText';
import { MIHappyPath } from '@procetra/common';

export function HappyPathGaugeBox(params: MIHappyPath): UIView {
    debugger;
    return (
        params == null ?
            UISkeleton().width('100%').height('245px')
            :
            VStack(
                TileBoxHeaderText('Happy path in percentages'),
                VStack(
                    Gauge(
                        Range()
                    ).color('rgb(118,209,187)').maskColor('rgb(120,120,120,20%)')
                        .radius(80)
                        .stroke(10)
                        .value(Convert.ToInt32(params.rate_count))
                        .height(155)
                )
            )
                .height('245px')
                .backgroundColor(Theme.secondaryBackgroundColor)
                .shadow({ default: '0px 3px 12px var(--application-border-color)', focus: '0 0 3px 1px #00c3ff' })
                .cornerRadius('12px')
                
                .marginHorizontal('2px')
                .tabIndex(0)
    )
}

export function HappyPathBox2(params: MIHappyPath): UIView {
    return (
        params == null ?
            UISkeleton().width('100%').height('245px')
            :
            VStack(
                TileBoxHeaderText('Happy path in absolute numbers'),
                HStack(
                    VDivider().width('1px').background('gray'),
                    VStack({ alignment: cLeading })(
                        RoundedRectangle().background('transparent').height('10px'),
                        RoundedRectangle().background({ default: '#14A9D5', hover: 'gray' }).height('20px').width().initial({ width: 0 }).animate({ width: `${(params.count / params.count_sum) * 100}%` }).__transition({ duration: 1 }),
                        RoundedRectangle().background('#E4E4E4').height('20px'),
                        RoundedRectangle().background('transparent').height('10px'),
                    )
                ).padding('30px').width('70%'),
                Text(params?.count.toString()).fontFamily('Proxima Nova').fontWeight('500').fontSize('27px').foregroundColor('#14a9d5'),
                Text(`of ${params.count_sum} Cases`)
                    .marginBottom('15px')
                    .fontFamily('Proxima Nova')
                    .fontWeight('500')
                    .fontSize('20px')
                    .foregroundColor('#888888'),
            )
                .height('245px')
                .backgroundColor(Theme.secondaryBackgroundColor)
                .shadow({ default: '0px 3px 12px var(--application-border-color)', focus: '0 0 3px 1px #00c3ff' })
                .cornerRadius('12px')
                 .marginHorizontal('2px')
                .tabIndex(0)
    )
}

function dhm(t) {
 
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000),
        pad = function (n) { return n < 10 ? '0' + n : n; };
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }
    return [d, pad(h), pad(m)].join(':');
}


export function HappyPathBox3(params: MIHappyPath): UIView {
    return (
        VStack(
            TileBoxHeaderText('Happy path throughput time'),
            VStack(
                HStack({ alignment: cBottom })(
                    RoundedRectangle().background('transparent').width('10px'),
                    RoundedRectangle().background('#14A9D5').width('20px').height('50%'),
                    RoundedRectangle().background('#E4E4E4').width('20px'),
                    RoundedRectangle().background('transparent').width('10px'),
                ),
                HDivider().height('1px').background('gray').width('50%'),
            ).padding('30px').width('70%'),
            Text(dhm(params?.caseDuration_mean * 1000)[0]).fontFamily('Proxima Nova').fontWeight('500').fontSize('27px').foregroundColor('#14a9d5'),
            Text(dhm(params?.caseDuration_all_mean * 1000)[0])
                .marginBottom('15px')
                .fontFamily('Proxima Nova')
                .fontSize('20px')
                .foregroundColor('#888888'),
        )
            .height('245px')
            .backgroundColor(Theme.secondaryBackgroundColor)
            .shadow({ default: '0px 3px 12px var(--application-border-color)', focus: '0 0 3px 1px #00c3ff' })
            .cornerRadius('12px')
            .marginHorizontal('2px')
            .tabIndex(0)
    )
}