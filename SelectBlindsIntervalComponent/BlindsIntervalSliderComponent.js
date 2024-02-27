
import { Slider, Text, View} from 'react-native';
import React, { useState } from 'react';
import { styles } from '../styles';
import CreateSliderStepNumbers from './Logic/CreateSliderStepNumbers';

const BlindsIntervalSliderComponent = (props) => {

    const sliderStepsProps = {
        timeStart: props.MinimumValue,
        timeStep: props.ValueIncrements,
        timeNumberOfSteps: ((props.MaximumValue - props.MinimumValue) / props.ValueIncrements) + 1,
    }
    const LengthsList = CreateSliderStepNumbers(sliderStepsProps) 

    const SliderHandler = (newValue) => {
        props.handleSliderChange(newValue);
    }
    return (
        <View>
            <View style={styles.stepContainer}>
                {LengthsList.timeStepList.map((line, index) => (
                    <Text key={index} style={props.raiseBlindInterval == line ? styles.sliderNumberSelected : styles.sliderNumber}>{line}m</Text>
                ))}
            </View>
            <Slider
                style={styles.slider}
                minimumValue={props.MinimumValue}
                maximumValue={props.MaximumValue}
                step={props.ValueIncrements}
                value={props.raiseBlindInterval}
                onValueChange={SliderHandler}
                minimumTrackTintColor="#44CCEE"
                maximumTrackTintColor="#000000"
                thumbTintColor="#44CCEE"
            />
        </View>
    )
}

export default BlindsIntervalSliderComponent;