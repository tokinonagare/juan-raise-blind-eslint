import React from 'react';
import {
    FlatList,
    Text,
    View,
    ScrollView,
} from 'react-native';
import styles from './style/BlindsStructureListStyle';
import Localization from '../../../lib/localization/Localization';
import { RowItemStyle, HeaderStyle } from '../model/StyleListItems';

const DynamicTable = ({ data }) => {
    const renderItem = ({ item }) => (
        <View style={styles.tableCell}>
            {Object.entries(item).map(([key, value], currentColumn) => (
                <Text
                    key={key}
                    style={RowItemStyle(currentColumn, styles)}
                >
                    {value}
                </Text>
            ))}
        </View>
    );

    const header = (
        <View style={styles.tableCellHeader}>
            {Object.keys(data[0]).map((key, currentColumn) => (
                <Text
                    key={key}
                    style={HeaderStyle(currentColumn, styles)}
                >
                    {Localization.translate(key)}
                </Text>
            ))}
        </View>
    );

    return (
        <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
        >
            <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={header}
            />
        </ScrollView>
    );
};

export default DynamicTable;
