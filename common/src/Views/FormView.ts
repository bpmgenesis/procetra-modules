import { UIView, UIScene, VStack, HStack, UIImage, PositionTypes, Text, cTopLeading } from '@tuval/forms';
import { Resources } from '../Resources/Resources';


export const FormView = ({ content }: { content: UIView }) => (
    UIScene(
        VStack(
           /*  HStack(
                UIImage(Resources.Icons.ApplicationIcon).width(25).opacity(0.8).position(PositionTypes.Absolute).left('10px').top('10px'),
                Text('Procetra').fontSize(16).fontWeight('700')
            ).height(50), */
            HStack({ alignment: cTopLeading })(
                content
            )
                // UIScene içerisine yayılması için
                .width('100%')
        )

    )
)