import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { styles } from '../styles';

const DynamicTable = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', padding: 10 }}>
      {Object.entries(item).map(([key, value], index) => (
        <Text key={index} 
        style={ index === 0 ? styles.tableLeft : index === 1 ? styles.tableCentre : styles.tableRight }>
          {value}
        </Text>
      ))}
    </View>
  );

  const header = (
    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: 'lightgray' }}>
      {Object.keys(data[0]).map((key, index) => (
        <Text key={index} 
          style={ index === 0 ? styles.tableLeft : index === 1 ? styles.tableCentre : styles.tableRight }>
          {key}
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