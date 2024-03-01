import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
            <Icon name="chevron-right" size={16} color="#44CCEE"/>
        </TouchableOpacity>
    );
};

export default NavigationButton;
