import React, { useState } from 'react';
import { View } from 'react-native';
import SelectBlindsIntervalComponent from '../../select-blinds-Interval/controller/SelectBlindsIntervalComponent';
import { ParentComponentStyle as styles } from './style/ParentComponentStyle';

const ParentComponent = ({ navigation }) => {
    const [TimeBasedRules, SetTimeBasedRules] = useState(null);

    const [bookingSecond] = useState(3600);
    const [smallBlind] = useState(1);
    const [raiseBlindSeconds, SetRaiseBlindInterval] = useState(180);
    const [isRaiseBlind, SetRaiseBlindEnable] = useState(false);

    const setRaiseBlindRules = (value) => {
        SetTimeBasedRules(value);
        console.log(TimeBasedRules);
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
        console.log('roomrule: ', roomRule);
    };

    const SelectBlindsIntervalProps = {
        roomRule,
        setRoomRule,
        navigation,
    };

    return (
        <View style={styles.homeComponent}>
            <SelectBlindsIntervalComponent
                {...SelectBlindsIntervalProps}
            />
        </View>
    );
};

export default ParentComponent;
