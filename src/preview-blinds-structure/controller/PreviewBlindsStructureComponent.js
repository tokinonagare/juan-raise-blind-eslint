import { View } from 'react-native';
import React from 'react';
import BlindsStructureList from '../view/BlindsStructureList';
import CreateBlindStructureList from '../model/CreateBlindsStructureList';
import Localization from '../../../lib/localization/Localization';

const PreviewBlindsStructureComponent = ({
    route,
}) => {
    const props = route.params.data;

    const data = {
        raiseBlindInterval: props.raiseBlindInterval,
        gameTime: props.gameTime,
        smallBlind: props.smallBlind,
    };

    const list = CreateBlindStructureList(data);

    return (
        <View>
            <BlindsStructureList data={list}/>
        </View>
    );
};

PreviewBlindsStructureComponent.navigationOptions = { title: Localization.translate('raise_blind_detail') };

export default PreviewBlindsStructureComponent;
