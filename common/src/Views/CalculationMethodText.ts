import { UIView } from '@tuval/forms';
import { Headline5 } from './Headline5';
export function CalculationMethodText(value: string): UIView {
    return (
        Headline5(value).fontFamily('Proxima Nova, sans serif').foregroundColor('#AAA')
    )
}