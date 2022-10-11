import { UIButton, Text, Color } from '@tuval/forms';

export const CancelButton = (text: string) => (
    UIButton(
        Text(text)
    )
        .cursor('pointer')
        .minWidth('64px')
        .foregroundColor(Color.gray500)
)