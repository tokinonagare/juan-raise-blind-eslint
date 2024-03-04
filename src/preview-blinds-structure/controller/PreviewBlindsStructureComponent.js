import { View } from 'react-native';
import React, { useEffect } from 'react';
import BlindsStructureList from '../view/BlindsStructureList';
import CreateBlindStructureList from '../model/CreateBlindsStructureList';
import NavigationButton from '../view/NavigationButton';

const PreviewBlindsStructureComponent = ({ navigation, route }) => {
    const props = route.params.blindStructureData;

    const data = {
        raiseBlindInterval: props.raiseBlindInterval,
        gameTime: props.gameTime,
        smallBlind: props.smallBlind,
    };

    const GoToParent = () => {
        navigation.navigate('Home', { data });
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
