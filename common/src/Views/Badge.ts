import { RegularText } from "./RegularText";

export function Badge(text: string, color: string, backColor: string) {
    return (
        RegularText(text,).padding('0 0.5rem')
            //.border(`1px solid ${color}`)
            .lineHeight('1').fontSize('0.65rem')
            .marginHorizontal('10px')
            .height('1.5rem')
            .backgroundColor(backColor)
            .foregroundColor(color)
            .cornerRadius(10).fontWeight('500')
            .shadow('rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;')
            .fontFamily('-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"')
    )
}