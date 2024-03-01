import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { NavigationButtonStyles as styles } from './style/NavigationButtonStyles';

const NavigationButton = (props) => {
    const { onPress, label } = props;
    return (
        <TouchableOpacity
            style={styles.navigationContainer}
            onPress={onPress}
        >
            <Text style={styles.navigationText}>
                {`${label} `}
            </Text>
            <Text style={styles.navigationArrow}>
                ❯
            </Text>
        </TouchableOpacity>
    );
};

export default NavigationButton;
