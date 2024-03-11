import { StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { Device } from 'board_game_react_native';

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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalTitle: {
        width: Device.width - 40,
        flexDirection: 'row',
        paddingVertical: 8,
    },
    modalTitleItem: {
        alignItems: 'center',
        flex: 1,
    },
    modalTitleTextContainer: {
        flex: 3,
    },
    modalTitleText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    modalCloseButtonContainer: {
        alignItems: 'flex-end',
        flex: 1,
    },
    modalCloseButton: {
        width: 30,
    },
    tableContainer: {
        flex: 1,
        maxWidth: '100%',
        minWidth: '100%',
    },
});
