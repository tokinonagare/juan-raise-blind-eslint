import { StyleSheet } from 'react-native';
import Color from '../../../../lib/util/Color';

export default StyleSheet.create({
    tableCell: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Color.white,
        borderBottomColor: Color.backgroundGrey,
        borderBottomWidth: 2,
    },
    tableCellHeader: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: Color.grayBackground,
    },
    tableLeft: {
        flex: 2,
        textAlign: 'left',
        color: Color.softBlue,
    },
    tableCentre: {
        flex: 2,
        textAlign: 'center',
        color: Color.textBlack,
    },
    tableRight: {
        flex: 3,
        textAlign: 'right',
        color: Color.textBlack,
    },
});
