import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import formatTime from '../model/timeFormatter';
import styles from './style/BlindsRaiseTimerComponentStyle';
import useCurrencyIcon from '../model/displayCurrencyIcon';

const coinIcon = require('../../../lib/Icons/resources/icon_blind_gold.png');
const chipIcon = require('../../../lib/Icons/resources/icon_blind_counter.png');
const upgradeIcon = require('../../../lib/Icons/resources/icon_blind_chip_upgrade.png');

const BlindRaiseTimer = (props) => {
    const {
        currency,
        currentBlinds,
        nextBlinds,
        countdownSeconds,
        blindIsRaised,
        timeInterval,
    } = props;

    const [currencyIcon, setCurrencyIcon] = useState(coinIcon);
    const [countdownTimer, setCountdownTimer] = useState(formatTime(countdownSeconds));

    const UpdateTime = (seconds) => {
        setCountdownTimer(formatTime(seconds));
    };

    useEffect(() => {
        UpdateTime(countdownSeconds);
    }, [countdownSeconds]);

    useEffect(() => {
        setCurrencyIcon(useCurrencyIcon(chipIcon, coinIcon, currency));
    }, [currency]);

    return (
        <View style={styles.parentView}>
            <View style={styles.topRow}>
                <View style={styles.rowColumn}>
                    <View style={styles.iconContainer}>
                        <Image source={currencyIcon}/>
                    </View>
                    <Text style={styles.centerText}>{currentBlinds}</Text>
                </View>
                <View style={styles.rowColumn}>
                    <Text style={styles.centerText}>{countdownTimer}</Text>
                </View>
            </View>
            {blindIsRaised
                ? (
                    <View style={styles.bottomRow}>
                        <View style={styles.nextBlindLabel}>
                            <View style={styles.iconContainer}>
                                <Image source={upgradeIcon}/>
                            </View>
                            <Text numberOfLines={1} style={styles.centerText}>Next Blinds</Text>
                        </View>
                        <View style={styles.nextBlind}>
                            <Text style={styles.centerText}>{`${nextBlinds}`}</Text>
                        </View>
                        <View style={styles.intervalLabel}>
                            <Text style={styles.centerText}>{`${timeInterval / 60}m`}</Text>
                        </View>
                    </View>
                )
                : <View/>}
        </View>
    );
};

export default BlindRaiseTimer;
