import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style/BlindsRaiseTimerComponentStyle';
import GetNextBlind from '../model/GetNextBlind';
import roomTimer from '../model/timerComponent';
import Localization from '../../../lib/localization/Localization';
import FormatBlind from '../model/FormatBlindDisplay';
import GetTimeInterval from '../model/GetTimeInterval';
import formatTime from '../model/timeFormatter';
import secondsToMinutes from '../model/timeConverter';

const chipIcon = require('../../../lib/Icons/resources/icon_blind_counter.png');
const goldIcon = require('../../../lib/Icons/resources/icon_blind_gold.png');
const upgradeIcon = require('../../../lib/Icons/resources/icon_blind_chip_upgrade.png');

const BlindRaiseTimer = ({
    remainSeconds,
    roomState,
    raiseBlinds,
    gameTime,
    currency = 'chip',
}) => {
    const [timeInterval, setTimeInterval] = useState(GetTimeInterval(raiseBlinds));
    const [currencyIcon] = useState(currency === 'chip' ? chipIcon : goldIcon);

    const countdownSeconds = roomTimer(remainSeconds, roomState);

    const [nextBlinds, setNextBlinds] = useState('');
    const [currentBlinds, setCurrentBlinds] = useState('');

    const updateBlinds = () => {
        if (raiseBlinds != null) {
            const nextBlindData = GetNextBlind(raiseBlinds, gameTime, countdownSeconds, timeInterval);
            setNextBlinds(FormatBlind(nextBlindData.nextBlind));
            setCurrentBlinds(FormatBlind(nextBlindData.currentBlind));
        }
    };

    const updateInterval = () => {
        setTimeInterval(GetTimeInterval(raiseBlinds));
    };

    useEffect(() => {
        if (remainSeconds <= 0) {
            return;
        }
        updateBlinds();
    }, [countdownSeconds]);

    useEffect(() => {
        updateBlinds();
        updateInterval();
    }, [raiseBlinds]);

    return (
        <View style={styles.parentView}>
            {roomState === 'running'
                ? (
                    <View style={styles.columnView}>
                        <View style={styles.row}>
                            <View style={styles.currentBlind}>
                                <View style={styles.iconContainer}>
                                    <Image source={currencyIcon}/>
                                </View>
                                <Text style={styles.centerText}>
                                    {currentBlinds}
                                </Text>
                            </View>
                            <View style={styles.timerLabel}>
                                <Text style={styles.centerText}>
                                    {formatTime(countdownSeconds)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.nextBlindLabel}>
                                <View style={styles.iconContainer}>
                                    <Image source={upgradeIcon}/>
                                </View>
                                <Text style={styles.centerText}>
                                    {Localization.translate('next_blinds')}
                                </Text>
                            </View>
                            <View style={styles.nextBlind}>
                                <Text style={styles.centerText}>{nextBlinds}</Text>
                            </View>
                            <View style={styles.intervalLabel}>
                                <Text style={styles.centerText}>{`${secondsToMinutes(timeInterval)}m`}</Text>
                            </View>
                        </View>
                    </View>
                )
                : <View/> }
        </View>
    );
};

export default BlindRaiseTimer;
