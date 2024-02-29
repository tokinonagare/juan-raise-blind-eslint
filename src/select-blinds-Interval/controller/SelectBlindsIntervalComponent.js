import React, {useState} from 'react';
import {View} from 'react-native';
import {SelectBlindsIntervalComponentStyle as styles} from './style/SelectBlindsIntervalComponentStyle';
import NavigationButton from '../view/NavigationButton';
import BlindsEnableFlip from '../view/BlindsEnableFlip';
import StepSlider from '../view/StepSlider.native';

function SelectBlindsIntervalComponent({navigation}) {
  const [raiseBlindInterval, setRaiseBlindInterval] = useState(3);
  const [isRaiseBlind, setIsRaiseBlind] = useState(false);

  const [MinimumValue] = useState(3);

  const data = {
    interval: raiseBlindInterval,
    flipState: isRaiseBlind,
    minute: MinimumValue,
  };

  const handleSliderChange = value => {
    setRaiseBlindInterval(value);
  };

  const handleFlipChange = () => {
    setIsRaiseBlind(!isRaiseBlind);
  };

  const ButtonHandler = () => {
    navigation.navigate('PreviewBlindsStructure', {data: data});
  };

  const BlindsFlipProps = {
    flipState: isRaiseBlind,
    handleFlipChange: handleFlipChange,
  };

  const NavigationButtonProps = {
    label: 'Blinds Structure',
    onPress: ButtonHandler,
  };

  const props = {
    testID: 'a',
    steps: [3, 5, 7],
    labels: ['3m', '5m', '7m'],
    currentValue: 3,
    onChange: handleSliderChange,
    showLabels: true,
    useClockThumbImage: false,
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.RaiseBlindsContainer}>
        <BlindsEnableFlip {...BlindsFlipProps} />
        <StepSlider {...props} />
        <View style={styles.navigationCentre}>
          <NavigationButton {...NavigationButtonProps} />
        </View>
      </View>
    </View>
  );
}

export default SelectBlindsIntervalComponent;
