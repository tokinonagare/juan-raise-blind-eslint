import {View, Text, Switch} from 'react-native';
import React from 'react';
import {BlindsEnableFlipStyle as styles} from './style/BlindsEnableFlipStyle';

const BlindsEnableFlip = props => {
  const FlipHandler = () => {
    props.handleFlipChange();
  };

  return (
    <View style={styles.flipContainer}>
      <View style={styles.flipContents}>
        <Text style={styles.flipText}>Blind Level Length</Text>
      </View>
      <View>
        <Switch
          onValueChange={FlipHandler}
          value={props.flipState}
          trackColor={{true: '#44CCEE'}}
        />
      </View>
    </View>
  );
};

export default BlindsEnableFlip;
