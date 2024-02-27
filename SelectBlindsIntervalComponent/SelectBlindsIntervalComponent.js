
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles';
import NavigationButton from '../NavigationButton';
import BlindsEnableFlipComponent from './BlindsEnableFlipComponent';
import BlindsIntervalSliderComponent from './BlindsIntervalSliderComponent';

function SelectBlindsIntervalComponent({ navigation }) {
    const [raiseBlindInterval, setRaiseBlindInterval] = useState(3);
    const [isRaiseBlind, setIsRaiseBlind] = useState(false);

    const [MinimumValue] = useState(3);
    const [MaximumValue] = useState(7);
    const [ValueIncrements] = useState(2);
 
    const data = {
      interval: raiseBlindInterval,
      flipState: isRaiseBlind,
      minute: MinimumValue
    }

    const handleSliderChange = (value) => {
      setRaiseBlindInterval(value);
    };

    const handleFlipChange = () => {
      setIsRaiseBlind(!isRaiseBlind);
    }

    const ButtonHandler = () => {
      navigation.navigate('PreviewBlindsStructure', {data: data })
    }

    const BlindsFlipProps = {
      flipState: isRaiseBlind,
      handleFlipChange: handleFlipChange,
    }

    const BlindsSliderProps = {
      MinimumValue: MinimumValue,
      MaximumValue: MaximumValue,
      ValueIncrements: ValueIncrements,
      raiseBlindInterval: raiseBlindInterval,
      handleSliderChange: handleSliderChange
    }

    const NavigationButtonProps = {
      label:"Blinds Structure",
      onPress: ButtonHandler
    }

    return (
      <View style={styles.home}>
        <View style={styles.sliderBox}>
          <BlindsEnableFlipComponent {...BlindsFlipProps} />
            <BlindsIntervalSliderComponent {...BlindsSliderProps} />
          <NavigationButton {...NavigationButtonProps} />
        </View>
      </View>
    );
  }  

  export default SelectBlindsIntervalComponent;