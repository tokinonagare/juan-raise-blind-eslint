import { TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationButtonStyles as styles } from './style/NavigationButtonStyles';

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
            <Icon name="chevron-left" size={16} color="#000000"/>
        </TouchableOpacity>
    );
};

export default NavigationButton;
