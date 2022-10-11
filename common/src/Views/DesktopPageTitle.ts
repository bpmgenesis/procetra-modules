import { UIView, HStack, Icon, Text } from '@tuval/forms';
export function DesktopPageTitle(icon: string, text: string): UIView {
    return (
        HStack({ spacing: 10 })(
            Icon(icon).size(30).foregroundColor('gray'),
            Text(text)
                .fontFamily('Proxima Nova')
                .fontSize('22px')
                .foregroundColor('#333333')
        )
            .height() // auto
            .width() //auto
    )
}