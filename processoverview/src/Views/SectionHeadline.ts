import { UIView, Text } from '@tuval/forms';
export function SectionHeadline(value: string): UIView {
    return (
        Text(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('20px').lineHeight('1.42857').foregroundColor('#333')
    )
}