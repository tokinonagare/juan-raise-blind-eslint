import { StyleSheet } from 'react-native';

export const NavigationButtonStyles = StyleSheet.create({
    navigationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginTop: 10,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 30,
        paddingRight: 30,
    },
    navigationText: {
        fontSize: 15,
        color: '#44CCEE',
    },
    navigationArrow: {
        fontSize: 20,
        color: '#44CCEE',
    },
});
