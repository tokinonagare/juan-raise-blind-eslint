import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    parentView: {
        marginVertical: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#39A070',
    },
    columnView: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    row: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    currentBlind: {
        flexDirection: 'row',
        paddingRight: 5,
        justifyContent: 'flex-end',
    },
    timerLabel: {
        flexDirection: 'row',
        paddingLeft: 5,
        justifyContent: 'flex-start',
    },
    nextBlind: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    nextBlindLabel: {
        flexDirection: 'row',
        paddingRight: 10,
        justifyContent: 'flex-end',
    },
    intervalLabel: {
        flexDirection: 'row',
        paddingLeft: 10,
        justifyContent: 'flex-start',
    },
    iconContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 2,
    },
    centerText: {
        textAlign: 'left',
        textAlignVertical: 'center',
        fontWeight: '400',
        color: 'rgba(255,255,255,0.6)',
    },
});
