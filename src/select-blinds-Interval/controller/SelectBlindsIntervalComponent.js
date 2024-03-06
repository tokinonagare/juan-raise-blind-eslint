import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './style/SelectBlindsIntervalComponentStyle';
import NavigationButton from '../view/NavigationButton';
import BlindsEnableFlip from '../view/BlindsEnableFlip';
import CreateTimeBasedRules from '../model/CreateTimeBasedRules';
import Localization from '../../../lib/localization/Localization';
// eslint-disable-next-line import/extensions,import/no-unresolved
import StepSlider from '../../../lib/StepIndicator/StepSlider';

const SelectBlindsIntervalComponent = ({
    navigation,
    roomRule,
    setRoomRule,
}) => {
    const [gameTime] = useState(roomRule.bookingSecond || 30 * 60);
    const [smallBlind] = useState(roomRule.smallBlind || 1);

    const [raiseBlindInterval, setRaiseBlindInterval] = useState(roomRule.raiseBlindSeconds);
    const [isRaiseBlind, setIsRaiseBlind] = useState(roomRule.isRaiseBlind || false);

    const handleSliderChange = (value) => {
        roomRule.setRaiseBlindInterval(value * 60);
        const raiseBlindRules = CreateTimeBasedRules({
            gameTime,
            raiseBlindInterval: value * 60,
            smallBlind,
        });
        roomRule.setRaiseBlindRules(raiseBlindRules);
        setRoomRule(roomRule);
        setRaiseBlindInterval(value * 60);
    };

    const handleFlipChange = () => {
        roomRule.setRaiseBlindEnable(!isRaiseBlind);
        const raiseBlindRules = CreateTimeBasedRules({
            gameTime,
            raiseBlindInterval,
            smallBlind,
        });
        roomRule.setRaiseBlindRules(raiseBlindRules);
        setRoomRule(roomRule);
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
        seconds: raiseBlindInterval,
        timeIsEnabled: isRaiseBlind,
    };

    const NavigationButtonProps = {
        label: Localization.translate('raise_blind_detail'),
        onPress: ButtonHandler,
    };

    const formatLabel = (value) => `${value}m`;

    const stepSliderProps = {
        testID: 'a',
        steps: [3, 5, 7],
        labels: ['3m', '5m', '7m'],
        currentValue: raiseBlindInterval / 60,
        onChange: handleSliderChange,
        useClockThumbImage: false,
        formatLabel,
        showLabels: true,
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
