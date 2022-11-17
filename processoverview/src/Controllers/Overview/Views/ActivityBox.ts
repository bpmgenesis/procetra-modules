import { int, Convert } from '@tuval/core';
import { UIView, VStack, Text, Alignment, Icon, Theme } from '@tuval/forms';

export interface MVIActivityBox {
    activityName: string;
    casePercentage: int;
    eventCount: int;
}
export function ActivityBox(params: MVIActivityBox): UIView {
    return (
        VStack(
            VStack({ spacing: 5 })(
                Icon('\\d309').size(30).foregroundColor('#14A9D5'),
                Text(params.activityName)

                    .padding(10)
                    .fontFamily('Proxima Nova')
                    .fontWeight('500')
                    .fontSize('14px')
                    .foregroundColor('#333'),

                Text(`In ${Convert.ToInt32(params.casePercentage)}% of cases`).fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#333'),
                Text(`${params.eventCount} Events`).fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888'),
            )
                .padding('20px')
                .backgroundColor(Theme.secondaryBackgroundColor)
                .shadow({ default: '0px 3px 12px var(--application-border-color)', focus: '0 0 3px 1px #00c3ff' })
                .cornerRadius('12px')
                .tabIndex(0)
        )
            /* .border('solid var(--border-width) yellow') */
            .height('180px')
            .padding('10px')
            .maxWidth('25%')

    )
}