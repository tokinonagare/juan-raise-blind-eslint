import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './style/NavigationButtonStyles';

const NavigationButton = (props) => {
    const { onPress } = props;

    const handlePress = () => {
        onPress();
    };

    return (
        <TouchableOpacity
            style={styles.navigationContainer}
            onPress={handlePress}
        >
            <Text style={styles.navigationArrow}>❮</Text>
        </TouchableOpacity>
    );
};

export default NavigationButton;
