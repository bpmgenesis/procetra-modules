import { UIButton, Text, Color, UIButtonClass, TApplication } from '@tuval/forms';


export function CancelButton(value: string): UIButtonClass {
    return (
        UIButton(
            Text(value).fontSize(TApplication.IsPortal ? '16px' : '')
        )
            .foregroundColor(TApplication.IsPortal ? '#ddd' : '#505A64')
            .border({
                default: TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #C8D2DC',
                hover: TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #B4BEC8',
                active: TApplication.IsPortal ? '1px solid #55606c' : 'solid 1px #B4BEC8'
            })
            .backgroundImage({
                default: TApplication.IsPortal ? '' : 'linear-gradient(#f5faff, #ebf0f5)',
                hover: TApplication.IsPortal ? '' : 'linear-gradient(#f5faff, #e7ecf1)',
                active: TApplication.IsPortal ? '' : 'linear-gradient(#ebf0f5, #e1e6eb)'
            })
            .backgroundColor({
                default: TApplication.IsPortal ? 'transparent' : '#EBF0F5',
                hover: TApplication.IsPortal ? '#354251' : '#E7ECF1',
                active: '#E1E6EB'
            })
            .height('27px')
            .minWidth(TApplication.IsPortal ? '140px' : '90px')
            .minHeight(TApplication.IsPortal ? '33px' : '')
            .margin('8px 10px 8px 0px')
            .cornerRadius('3px')
    )
}