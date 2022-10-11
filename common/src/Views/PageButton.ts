import { UIButton, Text, UIButtonClass, VStack, HStack } from '@tuval/forms';

export function PageButton(value: string): UIButtonClass {
    return (
        UIButton(
            HStack(
                Text(value)
                    .fontFamily('Source Sans Pro')
                    .fontSize(16)
                    .lineHeight('1.75')
            )
                .cornerRadius(5)
                .height(30)
                .foregroundColor('#fff')
                .backgroundColor('#028AEB')
                .transition('all 150ms ease-in-out')
                .shadow({
                    default: '0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
                    active: '0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)'
                })

        )
    )
}