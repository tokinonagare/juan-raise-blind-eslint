import { StyleSheet } from 'react-native';
import AppTheme from '../../../../lib/util/AppTheme';

export const BlindsEnableFlipStyle = StyleSheet.create({
    flipContainer: {
        flexDirection: 'row',
    },
    flipContents: {
        flex: 1,
    },
    flipText: {
        fontSize: 15,
        fontFamily: AppTheme.ContentTextFont,
        color: AppTheme.ContentTextColor,
    },
});
