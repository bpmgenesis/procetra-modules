import { UIView } from '@tuval/forms';
import { RegularText } from './RegularText';
export function SectionContent(value: string): UIView {
    return (
        RegularText(value)
    )
}
