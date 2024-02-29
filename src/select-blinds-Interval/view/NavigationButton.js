import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {NavigationButtonStyles as styles} from './style/NavigationButtonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavigationButton = props => {
  return (
    <TouchableOpacity
      style={styles.navigationContainer}
      onPress={props.onPress}>
      <Text style={styles.navigationText}>{props.label} </Text>
      <Icon name="chevron-right" size={16} color="#44CCEE" />
    </TouchableOpacity>
  );
};

export default NavigationButton;
