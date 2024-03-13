import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Slider,
    Text,
    Switch,
} from 'react-native';
import SelectBlindsIntervalComponent from '../../select-blinds-Interval/controller/SelectBlindsIntervalComponent';
import BlindStructurePopupComponent from '../../blinds-structure-popup/controller/BlindsStructurePopupComponent';
import BlindRaiseTimer from '../../blinds-raise-timer/controller/BlindsRaiseTimerComponent';
import styles from './style/ParentComponentStyle';
import Localization from '../../../lib/laiwan_localization/laiwan_localization';
import GetCurrentLevel from '../model/GetCurrentLevel';

const gameTime = 3600;

const ParentComponent = ({ navigation }) => {
    const [timeBasedRules, setTimeBasedRules] = useState(null);

    const [bookingSecond] = useState(gameTime);
    const [smallBlind] = useState(1);
    const [raiseBlindSeconds, setRaiseBlindInterval] = useState(180);
    const [isRaiseBlind, SetRaiseBlindEnable] = useState(false);

    const [currency, setCurrency] = useState('coin');
    const [currencyState, setCurrencyState] = useState(false);
    const [currentBlinds, setCurrentBlinds] = useState('1/2');
    const [countdownSeconds, setCountdownSeconds] = useState(gameTime);
    const [nextBlinds, setNextBlinds] = useState('2/4');

    const [currentLevel, setCurrentLevel] = useState(1);

    const ref = React.createRef();

    const SetCurrency = (value) => {
        if (!value) {
            setCurrency('coin');
            setCurrencyState(value);
        } else {
            setCurrency('chip');
            setCurrencyState(value);
        }
    };

    const UpdateTimer = (seconds) => {
        setCountdownSeconds(seconds);
        if (timeBasedRules != null) {
            const currentLevelData = GetCurrentLevel(timeBasedRules, bookingSecond, seconds);
            setCurrentBlinds(currentLevelData.currentLevel.blinds);
            setNextBlinds(currentLevelData.nextLevel);
            setCurrentLevel(currentLevelData.currentLevel.level);
        }
    };

    const SetRaiseBlindRules = (value) => {
        setTimeBasedRules(value, UpdateTimer(countdownSeconds));
    };

    const setRaiseBlindEnable = (value) => {
        SetRaiseBlindEnable(value, UpdateTimer(countdownSeconds));
    };

    const SetRaiseBlindInterval = (value) => {
        setRaiseBlindInterval(value, UpdateTimer(countdownSeconds));
    };

    let roomRule = {
        bookingSecond,
        smallBlind,
        raiseBlindSeconds,
        isRaiseBlind,
        setRaiseBlindRules: SetRaiseBlindRules,
        setRaiseBlindEnable,
        setRaiseBlindInterval: SetRaiseBlindInterval,
    };

    const setRoomRule = (value) => {
        roomRule = value;
    };

    const SelectBlindsIntervalProps = {
        roomRule,
        setRoomRule,
        navigation,
    };

    useEffect(() => {
        if (!isRaiseBlind) {
            setTimeBasedRules(null);
            setCurrentBlinds('1/2');
        }
    }, [isRaiseBlind]);

    useEffect(() => {
        if (timeBasedRules != null) {
            UpdateTimer(countdownSeconds);
        }
    }, [timeBasedRules]);

    return (
        <View style={styles.homeComponentVertical}>
            <View style={styles.homeComponentHorizontal}>
                <SelectBlindsIntervalComponent
                    {...SelectBlindsIntervalProps}
                />
            </View>
            <Button
                title={Localization.translate('button_show_modal')}
                onPress={() => ref.current.show()}
            />
            <BlindStructurePopupComponent
                timeBasedRules={timeBasedRules}
                currentLevel={currentLevel}
                ref={ref}
            />
            <View>
                <BlindRaiseTimer
                    countdownSeconds={countdownSeconds}
                    currency={currency}
                    blindIsRaised={isRaiseBlind}
                    nextBlinds={nextBlinds}
                    currentBlinds={currentBlinds}
                    timeInterval={raiseBlindSeconds}
                    ref={ref}
                />
            </View>
            <View style={styles.viewContainer}>
                <Text>{`Set remaining seconds: ${countdownSeconds}s`}</Text>
                <Slider
                    maximumValue={gameTime}
                    minimumValue={0}
                    step={1}
                    value={countdownSeconds}
                    onValueChange={(value) => UpdateTimer(value)}
                    style={styles.slider}
                />
                <Text>{`Set currency: ${currency}`}</Text>
                <View style={styles.switch}>
                    <Switch
                        value={currencyState}
                        onValueChange={(value) => SetCurrency(value)}
                    />
                </View>
            </View>
        </View>
    );
};

export default ParentComponent;
