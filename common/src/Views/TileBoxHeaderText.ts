import { UIView, TApplication, Text } from '@tuval/forms';
import { Headline5 } from './Headline5';
export function TileBoxHeaderText(value: string): UIView {
    if (TApplication.IsPortal) {
        return (
            Headline5(value).fontFamily('Ubuntu, sans-serif').padding('20px 30px 0 30px').fontWeight('700').foregroundColor('#495057DD')
        )
    } else {
        return (
            Text(value).padding('20px 30px 0 30px').fontFamily('Proxima Nova').fontSize('14px').foregroundColor('#888888')
        )
    }
}