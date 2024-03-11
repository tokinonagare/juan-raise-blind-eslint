import { StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import Device from '../../../../lib/Device/board_game_react_native';

export default StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        marginVertical: 50,
        backgroundColor: '#0f121e',
        paddingHorizontal: 15,
        paddingBottom: 25,
        width: Device.width - 40,
        height: 600,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        flexDirection: 'row',
        paddingVertical: 8,
        textAlign: 'center',
    },
    modalTitleText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    modalCloseButton: {
        width: 30,
        position: 'absolute',
        right: 10,
        top: 8,
    },
    tableContainer: {
        flex: 1,
        maxWidth: '100%',
        minWidth: '100%',
    },
});
