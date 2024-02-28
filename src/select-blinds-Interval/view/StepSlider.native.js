import React from 'react';
import {View} from 'react-native';

import AppTheme from '../../../resource/AppTheme';
import StepIndicator from './StepIndicator';

const iconCreateRoomChip = require('../../../resource/icon_create_room_chip.png');
const iconCreateRoomClock = require('../../../resource/icon_create_room_clock.png');

/**
 * StepSlider 对 StepIndicator 进行了一次包装
 * 不再向外暴露不受关心的 index 索引，只关注有哪些值，当前是什么值，变动后的值是多少
 */
const StepSlider = props => {
  const {
    testID,
    steps,
    currentValue,
    onChange,
    showLabels = true,
    useClockThumbImage,
  } = props;
  let {labels} = props;
  if (!(steps && steps.length)) {
    console.log('au');
    return null;
  }
  if (showLabels && !labels) {
    labels = steps;
  }
  const value = steps.findIndex(item => item === currentValue);
  return (
    <View
      style={{
        height: showLabels ? 60 : 50,
        marginTop: 10,
      }}>
      <StepIndicator
        testID={testID}
        step={1}
        stepCount={steps.length}
        onSlidingComplete={index => onChange && onChange(steps[index])}
        onValueChange={index => onChange && onChange(steps[index])}
        value={value}
        labels={labels}
        labelStyle={{
          color: AppTheme.SubContentTextColor,
          fontFamily: AppTheme.SubContentTextFont,
        }}
        minimumValue={0}
        maximumValue={steps.length}
        thumbTintColor="transparent"
        thumbImage={
          useClockThumbImage ? iconCreateRoomClock : iconCreateRoomChip
        }
        trackClickable
        _containerSize={{width: 50, height: 50}}
      />
    </View>
  );
};

export default StepSlider;
