import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Text,
    Switch,
} from 'react-native';
import SelectBlindsIntervalComponent from '../../select-blinds-Interval/controller/SelectBlindsIntervalComponent';
import BlindStructurePopupComponent from '../../blinds-structure-popup/controller/BlindsStructurePopupComponent';
import BlindRaiseTimer from '../../blinds-raise-timer/controller/BlindsRaiseTimerComponent';
import styles from './style/ParentComponentStyle';
import Localization from '../../../lib/laiwan_localization/laiwan_localization';

const gameTime = 3600;

const ParentComponent = ({ navigation }) => {
    const [timeBasedRules, setTimeBasedRules] = useState(null);

    const [bookingSecond] = useState(gameTime);
    const [smallBlind] = useState(1);
    const [raiseBlindSeconds, setRaiseBlindInterval] = useState(180);
    const [isRaiseBlind, SetRaiseBlindEnable] = useState(true);
    const [roomState, setRoomState] = useState('notRunning');
    const [roomStateEnable, setRoomStateEnable] = useState(false);

    const [remainSeconds] = useState(bookingSecond);

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
            <View>
                <BlindRaiseTimer
                    remainSeconds={remainSeconds}
                    roomState={roomState}
                    raiseBlinds={timeBasedRules}
                    gameTime={bookingSecond}
                />
            </View>
            <View style={styles.viewContainer}>
                <Text>{`roomState: ${roomState}`}</Text>
                <View style={styles.switch}>
                    <Switch
                        value={roomStateEnable}
                        onValueChange={(value) => {
                            if (value) {
                                setRoomState('running');
                                setRoomStateEnable(true);
                            } else {
                                setRoomState('notRunning');
                                setRoomStateEnable(false);
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default ParentComponent;
