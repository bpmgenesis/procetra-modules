
import {
    cTop, HStack, Text
} from '@tuval/forms';

export const LoadingScreen = () => (
    HStack({ alignment: cTop })(
        HStack(
            Text('Loading...')
        )
            .background('#f9edbe')
            .cornerRadius(2)
            .fontWeight('600')
            .marginTop('20px')
            .padding('3px 9px')
            .shadow('0 2px 2px rgb(0 0 0 / 20%)')
            .width()
            .height()
    )
)