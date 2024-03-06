import { View, Text, Switch } from 'react-native';
import React from 'react';
import styles from './style/BlindsEnableFlipStyle';
import Color from '../../../lib/util/Color';
import Localization from '../../../lib/localization/Localization';

const BlindsEnableFlip = (props) => {
    const { handleFlipChange, flipState, seconds, timeIsEnabled } = props;

    const minutes = Math.floor(seconds / 60);
    const displayMinutes = ` (${minutes}min)`;

    return (
        <View style={styles.flipContainer}>
            <View style={styles.flipContents}>
                <Text style={styles.flipText}>
                    {Localization.translate('raise_blind_interval')}
                    {timeIsEnabled ? displayMinutes : ''}
                </Text>
            </View>
            <View>
                <Switch
                    onValueChange={handleFlipChange}
                    value={flipState}
                    trackColor={{
                        false: Color.paleGrey,
                        true: Color.deepSkyBlue,
                    }}
                    thumbColor={Color.paleGrey}
                />
            </View>
        </View>
    );
};

export default BlindsEnableFlip;
