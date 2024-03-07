import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SelectBlindsIntervalComponent from '../../select-blinds-Interval/controller/SelectBlindsIntervalComponent';
import BlindStructurePopupComponent from '../../blinds-structure-popup/controller/BlindsStructurePopupComponent';
import styles from './style/ParentComponentStyle';

const ParentComponent = ({ navigation }) => {
    const [TimeBasedRules, SetTimeBasedRules] = useState(null);

    const [bookingSecond] = useState(3600);
    const [smallBlind] = useState(1);
    const [raiseBlindSeconds, SetRaiseBlindInterval] = useState(180);
    const [isRaiseBlind, SetRaiseBlindEnable] = useState(false);

    const setRaiseBlindRules = (value) => {
        SetTimeBasedRules(value);
    };

    const setRaiseBlindEnable = (value) => {
        SetRaiseBlindEnable(value);
    };

    const setRaiseBlindInterval = (value) => {
        SetRaiseBlindInterval(value);
    };

    let roomRule = {
        bookingSecond,
        smallBlind,
        raiseBlindSeconds,
        isRaiseBlind,
        setRaiseBlindRules,
        setRaiseBlindEnable,
        setRaiseBlindInterval,
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
            SetTimeBasedRules(null);
        }
    }, [isRaiseBlind]);

    return (
        <View style={styles.homeComponentVertical}>
            <View style={styles.homeComponentHorizontal}>
                <SelectBlindsIntervalComponent
                    {...SelectBlindsIntervalProps}
                />
            </View>
            <BlindStructurePopupComponent
                TimeBasedRules={TimeBasedRules}
                CurrentLevel={8}
            />
        </View>
    );
};

export default ParentComponent;
