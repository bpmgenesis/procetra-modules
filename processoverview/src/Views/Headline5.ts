import { UIView, Text } from '@tuval/forms';
export function Headline5(value: string): UIView {
    return (
        Text(value).fontFamily('Ubuntu, sans-serif').fontWeight('normal').fontSize('24.4615px').kerning('0px')
    )
}