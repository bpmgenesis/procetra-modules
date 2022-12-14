import { UIView, VStack, Text, Alignment, HStack, ForEach, Icon, RoundedRectangle, If, UIImage, Spacer, cTopLeading, UISkeleton, Theme } from '@tuval/forms';
import { int } from '@tuval/core';
import { Image } from '@tuval/graphics';
import { TileBoxHeaderText } from '../../../Views/TileBoxHeaderText';
import { MIHappyPath } from '@procetra/common';
export interface MVIHappyPathDiagramItem {
    name: string
}
export function HappyPathDiagram(items: MIHappyPath): UIView {
    return (
        items == null ?
            UISkeleton().width('100%').height(154)
            :
            VStack({ alignment: cTopLeading })(
                TileBoxHeaderText('Algorithmic happy path').fontSize('14px').fontWeight('500').foregroundColor('#333').fontFamily('Proxima Nova'),
                HStack(
                    ...ForEach(items.variant.split(','))((item: string, index: int) =>
                        VStack(
                            Text(item).marginBottom('10px').fontSize('14px').fontWeight('500').foregroundColor('#333').fontFamily('Proxima Nova'),
                            HStack({ spacing: 3 })(
                                If(index === 0)(Spacer().width('100%'))
                                    .else(
                                        RoundedRectangle().height(3).background('#e4e4e4').marginTop('-1px')
                                    ),
                                If(index === 0)(null)
                                    .else(
                                        UIImage('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTMgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA0MC4xICgzMzgwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+OTBDRDYzRDItOENGNy00OERFLTgzQTAtQUUzMTdERTg0MjVDPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQcm9jZXNzLW1ldHJpY3MiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJQcm9jZXNzLS0tb3ZlcnZpZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04NTYuMDAwMDAwLCAtMTE0OC4wMDAwMDApIiBmaWxsPSIjQ0NDQ0NDIj4KICAgICAgICAgICAgPGcgaWQ9Ik1BSU4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5MC4wMDAwMDAsIDU2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkhhcHB5LXBhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA2NjEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkhhcHB5LXBhdGgtdml6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMjk1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iTmV3LWhhcHB5LXBhdGgtdml6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMC4wMDAwMDAsIDc2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlJlY3RhbmdsZS00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NDIuNTAwMDAwLCA2Ni41MDAwMDApIHJvdGF0ZSgtMjcwLjAwMDAwMCkgdHJhbnNsYXRlKC02NDIuNTAwMDAwLCAtNjYuNTAwMDAwKSAiIHBvaW50cz0iNjQyLjUgNjAgNjQ5IDczIDY0Mi41IDY5Ljc1IDYzNiA3MyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=').marginLeft('-3px')
                                    ),
                                Icon('\\d309').size(30).foregroundColor('#14A9D5'),
                                If(index === items.variant.split(',').length - 1)(Spacer().width('100%'))
                                    .else(
                                        RoundedRectangle().height(3).background('#e4e4e4').marginTop('-1px'),
                                    )
                            )
                        )
                            .height() // auto
                            .marginTop('20px')
                    )
                )

            )
                .backgroundColor(Theme.secondaryBackgroundColor)
                .shadow({ default: '0px 3px 12px var(--application-border-color)', focus: '0 0 3px 1px #00c3ff' })
                .cornerRadius('12px')
                .height(154)

                .marginHorizontal('2px')
                .tabIndex(0)
    )
}