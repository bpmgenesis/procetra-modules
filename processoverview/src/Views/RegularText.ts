import { UITextClass, Text } from '@tuval/forms';
export function RegularText(value: string): UITextClass {
    return (
        Text(value).fontFamily('"Proxima Nova","Helvetica Neue",Helvetica,Arial,sans-serif').fontSize('14px').lineHeight('1.42857').foregroundColor('#333')
    )
}