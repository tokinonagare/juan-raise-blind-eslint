import React, { useState } from 'react';
import { View } from 'react-native';
import { SelectBlindsIntervalComponentStyle as styles } from './style/SelectBlindsIntervalComponentStyle';
import NavigationButton from '../view/NavigationButton';
import BlindsEnableFlip from '../view/BlindsEnableFlip';
import StepSlider from '../../../lib/StepIndicator/StepSlider.native';
import CreateTimeBasedRules from '../model/CreateTimeBasedRules';

const SelectBlindsIntervalComponent = ({
    navigation, data, setTimeBasedRules,
}) => {
    const [gameTime] = useState(data.gameTime || 0);
    const [smallBlind] = useState(data.smallBlind || 1);
    const [raiseBlindInterval, setRaiseBlindInterval] = useState(180);
    const [isRaiseBlind, setIsRaiseBlind] = useState(false);

    const createTimeBasedRules = (value) => {
        const listData = {
            gameTime,
            raiseBlindInterval: value,
            smallBlind,
        };
        const list = CreateTimeBasedRules(listData);
        setTimeBasedRules(list);
    };

    const handleSliderChange = (value) => {
        setRaiseBlindInterval(value * 60, createTimeBasedRules(value * 60));
    };

    const handleFlipChange = () => {
        setIsRaiseBlind(!isRaiseBlind, createTimeBasedRules(raiseBlindInterval));
    };

    const ButtonHandler = () => {
        const blindStructureData = {
            raiseBlindInterval,
            gameTime,
            smallBlind,
        };
        navigation.navigate('PreviewBlindsStructure', { blindStructureData });
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
        currentValue: raiseBlindInterval / 60,
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
