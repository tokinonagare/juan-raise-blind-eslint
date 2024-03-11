import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import SelectBlindsIntervalComponent from '../../select-blinds-Interval/controller/SelectBlindsIntervalComponent';
import BlindStructurePopupComponent from '../../blinds-structure-popup/controller/BlindsStructurePopupComponent';
import styles from './style/ParentComponentStyle';
import Localization from '../../../lib/laiwan_localization/laiwan_localization';

const ParentComponent = ({ navigation }) => {
    const [timeBasedRules, setTimeBasedRules] = useState(null);

    const [bookingSecond] = useState(3600);
    const [smallBlind] = useState(1);
    const [raiseBlindSeconds, setRaiseBlindInterval] = useState(180);
    const [isRaiseBlind, SetRaiseBlindEnable] = useState(false);

    const ref = React.createRef();

    const SetRaiseBlindRules = (value) => {
        setTimeBasedRules(value);
    };

    const setRaiseBlindEnable = (value) => {
        SetRaiseBlindEnable(value);
    };

    const SetRaiseBlindInterval = (value) => {
        setRaiseBlindInterval(value);
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
        }
    }, [isRaiseBlind]);

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
                currentLevel={8}
                ref={ref}
            />
        </View>
    );
};

export default ParentComponent;
