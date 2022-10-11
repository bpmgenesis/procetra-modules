import { TvChart } from '@realmocean/charts';
import { UIView, VStack, HStack, Text, Alignment, cTopLeading } from '@tuval/forms';
import { MetricBox } from './MetricBox';
import { HappyPathBox2, HappyPathBox3, HappyPathGaugeBox, } from './HappyPathBox';
import { HappyPathDiagram, MVIHappyPathDiagramItem } from './HappyPathDiagram';
import { MIHappyPath } from '@procetra/common';


export function HappyPathSection(value: MIHappyPath ): UIView {
    return (
        // We want to space 10px between every vertical block
        VStack({ alignment: cTopLeading, spacing: 10 })(
            Text('Happy path')
                .marginTop('30px')
                .paddingTop('5px')
                .height('38px')
                .fontFamily('Proxima Nova')
                .fontSize('20px')
                .foregroundColor('#333333'),
            HStack({ spacing: 10 })(
                HappyPathGaugeBox(value),
                HappyPathBox2(value),
                HappyPathBox3(value)
            ).height(), //auto height,
            HappyPathDiagram(value)
        ).height() // auto height
    )
}