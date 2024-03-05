import { View, Text, Switch } from 'react-native';
import React from 'react';
import { BlindsEnableFlipStyle as styles } from './style/BlindsEnableFlipStyle';
import Color from '../../../lib/util/Color';
import Localization from '../../../lib/localization/Localization';

const BlindsEnableFlip = (props) => {
    const { handleFlipChange, flipState } = props;

    return (
        <View style={styles.flipContainer}>
            <View style={styles.flipContents}>
                <Text style={styles.flipText}>{Localization.translate('raise_blind_interval')}</Text>
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
