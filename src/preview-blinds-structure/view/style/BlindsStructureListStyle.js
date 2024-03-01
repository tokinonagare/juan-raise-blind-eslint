import { StyleSheet } from 'react-native';

export const BlindStructuresListStyle = StyleSheet.create({
    tableCell: {
        flexDirection: 'row',
        padding: 10,
    },
    tableCellHeader: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'lightgray',
    },
    tableLeft: {
        flex: 1,
        textAlign: 'left',
    },
    tableCentre: {
        flex: 1,
        textAlign: 'center',
    },
    tableRight: {
        flex: 1,
        textAlign: 'right',
    },
});
