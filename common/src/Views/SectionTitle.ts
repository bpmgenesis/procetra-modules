import { UIView } from '@tuval/forms';
import { RegularText } from './RegularText';
export function SectionTitle(value: string): UIView {
    return (
        RegularText(value).fontWeight('500')
    )
}