import React, { useState } from 'react';
import { View } from 'react-native';
import SelectBlindsIntervalComponent from '../../select-blinds-Interval/controller/SelectBlindsIntervalComponent';
import { ParentComponentStyle as styles } from './style/ParentComponentStyle';

const ParentComponent = ({ navigation }) => {
    const [TimeBasedRules, SetTimeBasedRules] = useState(null);

    const setTimeBasedRules = (data) => {
        SetTimeBasedRules(data);
        console.log(TimeBasedRules);
    };

    const SelectBlindsIntervalProps = {
        data: {
            gameTime: 0,
            smallBlind: 1,
        },
        setTimeBasedRules,
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
