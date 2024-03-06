import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './style/BlindsStructureListStyle';
import Localization from '../../../lib/localization/Localization';

const DynamicTable = ({ data }) => {
    const renderItem = ({ item }) => (
        <View style={styles.tableCell}>
            {Object.entries(item).map(([key, value], index) => (
                <Text
                    key={key}
                    style={
                        (() => {
                            if (index === 0) return styles.tableLeft;
                            if (index === 1) return styles.tableCentre;
                            if (index === 2) return styles.tableRight;
                            return styles.tableLeft;
                        })()
                    }
                >
                    {value}
                </Text>
            ))}
        </View>
    );

    const header = (
        <View style={styles.tableCellHeader}>
            {Object.keys(data[0]).map((key, index) => (
                <Text
                    key={key}
                    style={
                        (() => {
                            if (index === 0) return styles.tableLeft;
                            if (index === 1) return styles.tableCentre;
                            if (index === 2) return styles.tableRight;
                            return styles.tableLeft;
                        })()
                    }
                >
                    {Localization.translate(key)}
                </Text>
            ))}
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={header}
        />
    );
};

export default DynamicTable;
