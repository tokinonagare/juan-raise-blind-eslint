/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Text, Button, View, Slider, StyleSheet, Switch } from 'react-native';
import DynamicTable from './DynamicTable/DynamicTable';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './styles';
import NavigationButton from './NavigationButton';
import buildList from './buildList';
import { changeInterval, blindChangeState } from './blindsSlice';
import { connect } from 'react-redux';
import sliderSteps from './sliderSteps';
import BlindsFlip from './BlindsFlipped';
import BlindsSlider from './BlindsSlider';

const Stack = createStackNavigator();


const MyComponent = (props) => {

  function PreviewBlindsStructureScreen( {route, navigation} ) {
    
    const props = route.params.data;
    const data = {
      duration: { minute: props.interval, second: 0 },
      interval: (props.flipState ? 2 : 1),
      startTime: { minute: props.minute, second: 0 },
      blinds: { blind1: 1, blind2: 2 }
    }
    const list = buildList(data);

    return (
      <View>
        <DynamicTable data={list} />
      </View>
    );
  }

  function HomeScreen({ navigation }) {
    const [raiseBlindInterval, setRaiseBlindInterval] = useState(3);
    const [isRaiseBlind, setIsRaiseBlind] = useState(false);

    const [MinimumValue] = useState(3);
    const [MaximumValue] = useState(7);
    const [ValueIncrements] = useState(2);
 
    const data = {
      interval: raiseBlindInterval,
      flipState: isRaiseBlind,
      minute: MinimumValue
    }

    const handleSliderChange = (value) => {
      setRaiseBlindInterval(value);
    };

    const handleFlipChange = () => {
      setIsRaiseBlind(!isRaiseBlind);
    }

    const ButtonHandler = () => {
      console.log(data)
      navigation.navigate('PreviewBlindsStructure', {data: data })
    }

    const BlindsFlippedProps = {
      flipState: isRaiseBlind,
      handleFlipChange: handleFlipChange,
    }

    const BlindsSliderProps = {
      MinimumValue: MinimumValue,
      MaximumValue: MaximumValue,
      ValueIncrements: ValueIncrements,
      raiseBlindInterval: raiseBlindInterval,
      handleSliderChange: handleSliderChange
    }

    const ButtonProps = {
      label:"Blinds Structure",
      onPress: ButtonHandler
    }

    return (
      <View style={styles.home}>
        <View style={styles.sliderBox}>
          <BlindsFlip {...BlindsFlippedProps} />
            <BlindsSlider {...BlindsSliderProps} />
          <NavigationButton {...ButtonProps} />
        </View>
      </View>
    );
  }  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="PreviewBlindsStructure" component={PreviewBlindsStructureScreen} options={{ title: 'Preview Blinds Structure' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyComponent;
