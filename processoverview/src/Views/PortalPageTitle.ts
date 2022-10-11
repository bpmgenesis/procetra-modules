import { UIView, HStack, Icon, Text } from '@tuval/forms';
export function PortalPageTitle(icon: string, text: string): UIView {
    return (
        HStack({ spacing: 10 })(
            Icon(icon).size(30).foregroundColor('#333333'),
            Text(text)
                .fontWeight('700')
                .fontFamily('Ubuntu, sans-serif')
                .fontSize('30px')
                .foregroundColor('#495057')

        )
            .marginLeft('10px')
            .width() //auto
    )
}