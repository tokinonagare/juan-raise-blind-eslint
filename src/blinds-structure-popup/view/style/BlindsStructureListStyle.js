import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    table: {
        flexGrow: 1,
    },
    tableCellOdd: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#222639',
    },
    tableCellEven: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#1e2131',
    },
    tableLeft: {
        flex: 3,
        textAlign: 'left',
        color: '#8387a0',
    },
    tableCentre: {
        flex: 1,
        textAlign: 'center',
        color: '#8387a0',
    },
    tableRight: {
        flex: 3,
        textAlign: 'right',
        color: '#8387a0',
    },
    tableCellHeader: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#0f121e',
    },
    tableHeaderLeft: {
        flex: 3,
        textAlign: 'left',
        color: '#919191',
    },
    tableHeaderCentre: {
        flex: 1,
        textAlign: 'center',
        color: '#919191',
    },
    tableHeaderRight: {
        flex: 3,
        textAlign: 'right',
        color: '#919191',
    },
    tableSelectedLeft: {
        flex: 3,
        textAlign: 'left',
        color: '#faca4a',
    },
    tableSelectedCentre: {
        flex: 1,
        textAlign: 'center',
        color: '#faca4a',
    },
    tableSelectedRight: {
        flex: 3,
        textAlign: 'right',
        color: '#faca4a',
    },
});
