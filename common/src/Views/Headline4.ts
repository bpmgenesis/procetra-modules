import { UITextClass, Text } from '@tuval/forms';
export function Headline4(value: string): UITextClass {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('34.6538px').kerning('0.25px')
    )
}