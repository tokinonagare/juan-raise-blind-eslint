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
    topRow: {
        marginHorizontal: 35,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottomRow: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rowColumn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    wideColumn: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
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
