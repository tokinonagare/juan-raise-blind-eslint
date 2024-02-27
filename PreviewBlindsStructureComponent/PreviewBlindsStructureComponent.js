
import { View } from "react-native";
import React from 'react';
import DynamicTable from "../DynamicTable/DynamicTable";
import CreateBlindStructureList from "./Logic/CreateBlindsStructureList";

function PreviewBlindsStructureComponent( {route, navigation} ) {
    
    const props = route.params.data;
    const data = {
      duration: { minute: props.interval, second: 0 },
      interval: (props.flipState ? 2 : 1),
      startTime: { minute: props.minute, second: 0 },
      blinds: { blind1: 1, blind2: 2 }
    }
    const list = CreateBlindStructureList(data);

    return (
      <View>
        <DynamicTable data={list} />
      </View>
    );
  }

  export default PreviewBlindsStructureComponent;
