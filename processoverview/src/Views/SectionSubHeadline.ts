import { UIView, Text } from '@tuval/forms';
export function SectionSubHeadline(value: string): UIView {
    return (
        Text(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('16px').fontWeight('normal').lineHeight('1.42857').foregroundColor('#666666')
    )
}