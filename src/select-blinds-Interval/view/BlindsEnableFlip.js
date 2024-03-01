import { View, Text, Switch } from 'react-native';
import React from 'react';
import { BlindsEnableFlipStyle as styles } from './style/BlindsEnableFlipStyle';

const BlindsEnableFlip = (props) => {
    const { handleFlipChange, flipState } = props;

    return (
        <View style={styles.flipContainer}>
            <View style={styles.flipContents}>
                <Text style={styles.flipText}>Blind Level Length</Text>
            </View>
            <View>
                <Switch
                    onValueChange={handleFlipChange}
                    value={flipState}
                    trackColor={{ true: '#44CCEE' }}
                />
            </View>
        </View>
    );
};

export default BlindsEnableFlip;
