import React from 'react';
import {
    FlatList,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import Localization from '../../../lib/laiwan_localization/laiwan_localization';
import styles from './style/BlindsStructureListStyle';
import { ItemRowStyle, RenderCurrentValue, AlternatingBackgroundStyle } from '../model/StyleListItems';

const BlindsStructureList = ({
    timeBasedRules,
    currentLevel,
}) => {
    const renderItem = ({
        item,
        index: currentItem,
    }) => (
        <TouchableWithoutFeedback>
            <View style={AlternatingBackgroundStyle(currentItem, styles)}>
                {Object.entries(item)
                    .map(([key, value], currentColumn) => (
                        <Text
                            key={key}
                            style={ItemRowStyle(currentColumn, currentItem, currentLevel, styles)}
                        >
                            {RenderCurrentValue(currentItem, currentLevel, value)}
                        </Text>
                    ))}
            </View>
        </TouchableWithoutFeedback>
    );

    const header = (
        <TouchableWithoutFeedback>
            <View style={styles.tableCellHeader}>
                <Text style={styles.tableHeaderLeft}>{Localization.translate('user_level')}</Text>
                <Text style={styles.tableHeaderCentre}>{Localization.translate('times')}</Text>
                <Text style={styles.tableHeaderRight}>{Localization.translate('blind_label')}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
            onResponderTerminationRequest={() => false}
        >
            <FlatList
                scrollEnabled={false}
                style={styles.table}
                data={timeBasedRules}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={header}
            />
        </ScrollView>
    );
};

export default BlindsStructureList;
