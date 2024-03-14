import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import formatTime from '../model/timeFormatter';
import styles from './style/BlindsRaiseTimerComponentStyle';
import useCurrencyIcon from '../model/displayCurrencyIcon';
import GetCurrentLevel from '../model/GetCurrentLevel';
import roomTimer from '../model/timerComponent';
import Localization from '../../../lib/localization/Localization';

const coinIcon = require('../../../lib/Icons/resources/icon_blind_gold.png');
const chipIcon = require('../../../lib/Icons/resources/icon_blind_counter.png');
const upgradeIcon = require('../../../lib/Icons/resources/icon_blind_chip_upgrade.png');

const BlindRaiseTimer = ({
    remainSeconds,
    roomState,
    raiseBlinds,
}) => {
    const [timeInterval, setTimeInterval] = useState(raiseBlinds ? raiseBlinds[1].afterSeconds : 180);

    const [currencyIcon, setCurrencyIcon] = useState(coinIcon);
    const [countdownTimer, setCountdownTimer] = useState(formatTime(remainSeconds));

    const CountdownSeconds = roomTimer(remainSeconds, roomState);

    const [currency] = useState('coin');
    const [currentBlinds, setCurrentBlinds] = useState('1/2');
    const [nextBlinds, setNextBlinds] = useState('2/4');

    const updateBlinds = () => {
        if (raiseBlinds != null) {
            const currentLevelData = GetCurrentLevel(raiseBlinds, 3600, CountdownSeconds);
            setCurrentBlinds(currentLevelData.currentLevel.blinds);
            setNextBlinds(currentLevelData.nextLevel);
        }
    };

    const updateInterval = () => {
        setTimeInterval(raiseBlinds ? raiseBlinds[1].afterSeconds : 180);
    };

    useEffect(() => {
        if (roomState === 'notRunning') {
            return;
        }
        setCountdownTimer(formatTime(CountdownSeconds));
        updateBlinds();
    }, [CountdownSeconds]);

    useEffect(() => {
        updateBlinds();
        updateInterval();
    }, [raiseBlinds]);

    useEffect(() => {
        setCurrencyIcon(useCurrencyIcon(chipIcon, coinIcon, currency));
    }, [currency]);

    return (
        <View style={styles.parentView}>
            <View style={styles.topRow}>
                <View style={styles.currentBlind}>
                    <View style={styles.iconContainer}>
                        <Image source={currencyIcon}/>
                    </View>
                    <Text style={styles.centerText}>{currentBlinds}</Text>
                </View>
                <View style={styles.timer}>
                    <Text style={styles.centerText}>{countdownTimer}</Text>
                </View>
            </View>
            <View style={styles.bottomRow}>
                <View style={styles.nextBlindLabel}>
                    <View style={styles.iconContainer}>
                        <Image source={upgradeIcon}/>
                    </View>
                    <Text numberOfLines={1} style={styles.centerText}>{Localization.translate('nextBlinds')}</Text>
                </View>
                <View style={styles.nextBlind}>
                    <Text style={styles.centerText}>{`${nextBlinds}`}</Text>
                </View>
                <View style={styles.intervalLabel}>
                    <Text style={styles.centerText}>{`${timeInterval / 60}m`}</Text>
                </View>
            </View>
        </View>
    );
};

export default BlindRaiseTimer;
