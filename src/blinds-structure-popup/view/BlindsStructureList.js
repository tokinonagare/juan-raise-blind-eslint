import React from 'react';
import { FlatList, Text, View } from 'react-native';
import styles from './style/BlindsStructureListStyle';

const BlindsStructureList = ({ TimeBasedRules, CurrentLevel }) => {
    const renderItem = ({ item, index: index1 }) => (
        <View style={
            (() => {
                if (index1 % 2 === 0) return styles.tableCellEven;
                if (index1 % 2 !== 0) return styles.tableCellOdd;
                return styles.tableCellOdd;
            })()
        }
        >
            {Object.entries(item).map(([key, value], index) => (
                <Text
                    key={key}
                    style={
                        (() => {
                            if (index1 + 1 === CurrentLevel) {
                                if (index === 0) return styles.tableSelectedLeft;
                                if (index === 1) return styles.tableSelectedCentre;
                                if (index === 2) return styles.tableSelectedRight;
                            }
                            if (index === 0) return styles.tableLeft;
                            if (index === 1) return styles.tableCentre;
                            if (index === 2) return styles.tableRight;
                            return styles.tableLeft;
                        })()
                    }
                >
                    {
                        (() => {
                            if (index1 + 1 === CurrentLevel && index === 0) return `${value} Current Level`;
                            return value;
                        })()
                    }
                </Text>
            ))}
        </View>
    );

    const header = (
        <View style={styles.tableCellHeader}>
            <Text style={styles.tableHeaderLeft}>Level</Text>
            <Text style={styles.tableHeaderCentre}>Time</Text>
            <Text style={styles.tableHeaderRight}>Blinds</Text>
        </View>
    );

    return (
        <View>
            <FlatList
                style={styles.table}
                data={TimeBasedRules}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={header}
                stickyHeaderIndices={[0]}
            />
        </View>
    );
};

export default BlindsStructureList;
