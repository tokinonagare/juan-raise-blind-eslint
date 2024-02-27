import { View, Text, Switch } from 'react-native';
import React from 'react';
import { styles } from '../styles';
import { useState } from 'react';

const BlindsEnableFlipComponent = (props) => {

    const FlipHandler = () => {
      props.handleFlipChange();
    }

    return (
        <View style={styles.switchContainer}>
            <View style={styles.switchContents}>
              <Text style={styles.switchText}>Blind Level Length</Text>
            </View>
            <View style={styles.switchContent}>
              <Switch 
                onValueChange={FlipHandler}
                value={props.flipState}
		            trackColor={{ true: "#44CCEE" }}
              />
            </View>
        </View>
    )
}

export default BlindsEnableFlipComponent;