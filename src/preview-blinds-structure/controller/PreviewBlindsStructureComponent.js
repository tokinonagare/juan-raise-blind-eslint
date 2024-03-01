import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import BlindsStructureList from '../view/BlindsStructureList';
import CreateBlindStructureList from '../model/CreateBlindsStructureList';
import NavigationButton from '../view/NavigationButton';

const PreviewBlindsStructureComponent = ({ navigation, route }) => {
    const props = route.params.data;

    const [raiseBlindInterval] = useState(props.raiseBlindInterval);
    const [gameTime] = useState(props.gameTime);
    const [smallBlind] = useState(props.smallBlind);

    const data = {
        raiseBlindInterval,
        gameTime,
        smallBlind,
    };

    const ParentProps = {
        raiseBlindInterval,
        gameTime,
    };

    const GoToParent = () => {
        navigation.navigate('Home', { data: ParentProps });
    };

    const NavigationProps = {
        onPress: GoToParent,
    };

    const list = CreateBlindStructureList(data);

    const createNavigationButton = () => <NavigationButton {...NavigationProps}/>;

    useEffect(() => {
        navigation.setOptions({
            headerLeft: createNavigationButton,
        });
    }, []);

    return (
        <View>
            <BlindsStructureList data={list}/>
        </View>
    );
};

export default PreviewBlindsStructureComponent;
