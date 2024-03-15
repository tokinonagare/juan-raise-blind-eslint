import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style/BlindsRaiseTimerComponentStyle';
import GetCurrentLevel from '../model/GetCurrentLevel';
import roomTimer from '../model/timerComponent';
import Localization from '../../../lib/localization/Localization';
import FormatBlind from '../model/FormatBlindDisplay';
import GetTimeInterval from '../model/GetTimeInterval';

const upgradeIcon = require('../../../lib/Icons/resources/icon_blind_chip_upgrade.png');

const BlindRaiseTimer = ({
    remainSeconds,
    roomState,
    raiseBlinds,
    gameTime,
}) => {
    const [timeInterval, setTimeInterval] = useState(GetTimeInterval(raiseBlinds));

    const CountdownSeconds = roomTimer(remainSeconds, roomState);

    const [nextBlinds, setNextBlinds] = useState('');

    const updateBlinds = () => {
        if (raiseBlinds != null) {
            const currentLevelData = GetCurrentLevel(raiseBlinds, gameTime, CountdownSeconds);
            setNextBlinds(FormatBlind(currentLevelData));
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
    }, [CountdownSeconds]);

    useEffect(() => {
        updateBlinds();
        updateInterval();
    }, [raiseBlinds]);

    return (
        <View style={styles.parentView}>
            {roomState === 'running'
                ? (
                    <View style={styles.row}>
                        <View style={styles.nextBlindLabel}>
                            <View style={styles.iconContainer}>
                                <Image source={upgradeIcon}/>
                            </View>
                            <Text numberOfLines={1} style={styles.centerText}>
                                {Localization.translate('nextBlinds')}
                            </Text>
                        </View>
                        <View style={styles.nextBlind}>
                            <Text style={styles.centerText}>{nextBlinds}</Text>
                        </View>
                        <View style={styles.intervalLabel}>
                            <Text style={styles.centerText}>{`${timeInterval}m`}</Text>
                        </View>
                    </View>
                )
                : <View/> }
        </View>
    );
};

export default BlindRaiseTimer;
