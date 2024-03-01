import React, { useState } from 'react';
import { View } from 'react-native';
import { SelectBlindsIntervalComponentStyle as styles } from './style/SelectBlindsIntervalComponentStyle';
import NavigationButton from '../view/NavigationButton';
import BlindsEnableFlip from '../view/BlindsEnableFlip';
import StepSlider from '../../../lib/StepIndicator/StepSlider.native';

const SelectBlindsIntervalComponent = ({ navigation, route }) => {
    const { params } = route;

    const [gameTime] = useState(params != null ? params.data.gameTime : 0);
    const [smallBlind] = useState(params != null ? params.data.smallBlind : 1);

    const [raiseBlindInterval, setRaiseBlindInterval] = useState(3);
    const [isRaiseBlind, setIsRaiseBlind] = useState(false);

    const handleSliderChange = (value) => {
        setRaiseBlindInterval(value);
    };

    const handleFlipChange = () => {
        setIsRaiseBlind(!isRaiseBlind);
    };

    const ButtonHandler = () => {
        const blindStructureData = {
            raiseBlindInterval,
            gameTime,
            smallBlind,
        };

        navigation.navigate('PreviewBlindsStructure', { data: blindStructureData });
    };

    const BlindsFlipProps = {
        flipState: isRaiseBlind,
        handleFlipChange,
    };

    const NavigationButtonProps = {
        label: 'Blinds Structure',
        onPress: ButtonHandler,
    };

    const stepSliderProps = {
        testID: 'a',
        steps: [3, 5, 7],
        labels: ['3m', '5m', '7m'],
        currentValue: raiseBlindInterval,
        onChange: handleSliderChange,
        showLabels: true,
        useClockThumbImage: false,
    };

    return (
        <View style={styles.homeContainer}>
            <View>
                <BlindsEnableFlip {...BlindsFlipProps}/>
                {isRaiseBlind ? (
                    <View>
                        <StepSlider {...stepSliderProps}/>
                        <View style={styles.navigationCentre}>
                            <NavigationButton {...NavigationButtonProps}/>
                        </View>
                    </View>
                ) : (
                    <View/>
                )}
            </View>
        </View>
    );
};

export default SelectBlindsIntervalComponent;
