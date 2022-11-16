import { cTop, UIView, VStack } from '@tuval/forms';

export function TileBox(...content: any[]): UIView {
    return (
        VStack({alignment:cTop})(
            VStack(
                ...content
            )
                .padding(10)
                .backgroundColor('var(--secondary-background-color)')
                .cornerRadius(8)
                .shadow({ default: '0px 3px 12px var(--application-border-color)', focus: '0 0 3px 1px #00c3ff' })
                .tabIndex(0)
        ).padding(2)
    )
}