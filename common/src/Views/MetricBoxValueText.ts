import { UIView } from '@tuval/forms';
import { Headline4 } from './Headline4';
export function MetricBoxValueText(value: string): UIView {
    return (
        Headline4(value).fontFamily('Proxima Nova, sans serif').fontWeight('500').foregroundColor('#14a9d5').whiteSpace('nowrap')
    )
}