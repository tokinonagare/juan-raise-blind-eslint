import {View} from 'react-native';
import React from 'react';
import BlindsStructureList from '../view/BlindsStructureList';
import CreateBlindStructureList from '../model/CreateBlindsStructureList';

function PreviewBlindsStructureComponent({route, navigation}) {
  const props = route.params.data;
  const data = {
    raiseBlindInterval: {
      minute: props.raiseBlindInterval,
      second: 0,
    },
    gameTime: props.gameTime,
    blinds: {
      blind1: 1,
      blind2: 2,
    },
  };

  const list = CreateBlindStructureList(data);

  return (
    <View>
      <BlindsStructureList data={list} />
    </View>
  );
}

export default PreviewBlindsStructureComponent;
