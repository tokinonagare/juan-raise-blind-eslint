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



const Stack = createStackNavigator();


const mapStateToProps = (state) => {
  return {
    interval: state.blinds.raiseBlindInterval,
    switchState: state.blinds.isRaiseBlind,
    minute: state.blinds.startTimeMinute,
    second: state.blinds.startTimeSecond,
    blind1: state.blinds.blind1,
    blind2: state.blinds.blind2,
    sliderStep: state.blinds.sliderStep,
    sliderNumberOfSteps: state.blinds.sliderNumberOfSteps
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInterval: (text) => dispatch(changeInterval(text)),
    blindChangeState: () => dispatch(blindChangeState())
  };
}

const MyComponent = (props) => {

  function PreviewBlindsStructureScreen({ route, navigation }) {
    const data = {
      duration: { minute: props.interval, second: 0 },
      interval: (props.switchState ? 2 : 1),
      startTime: { minute: props.minute, second: props.second },
      blinds: { blind1: props.blind1, blind2: props.blind2 }
    }
    const list = buildList(data);

    return (
      <View>
        <DynamicTable data={list} />
      </View>
    );
  }

  function HomeScreen({ navigation }) {
    const sliderStepsProps = {
      timeStart: props.minute,
      timeStep: props.sliderStep,
      timeNumberOfSteps: props.sliderNumberOfSteps,
      switchState: props.switchState
    }
    const data = sliderSteps(sliderStepsProps)
    const handleSliderChange = (value) => {
      props.changeInterval(value);
    };

    const handleSwitchChange = () => {
      props.blindChangeState();
    }

    const ButtonHandler = () => {
      navigation.navigate('PreviewBlindsStructure', { data: data })
    }

    const ButtonProps = {
      label:"Blinds Structure",
      onPress: ButtonHandler
    }

    return (
      <View style={styles.home}>
        <View style={styles.sliderBox}>
          <View style={styles.switchContainer}>
            <View style={styles.switchContents}>
              <Text style={styles.switchText}>Blind Level Length</Text>
            </View>
            <View style={styles.switchContent}>
              <Switch 
                value={props.switchState}
                onValueChange={handleSwitchChange}
		trackColor={{ true: "#44CCEE" }}
              />
            </View>
          </View>
          <View style={styles.stepContainer}>
            {data.timeStepList.map((line, index) => (
            <Text key={index} style={props.interval == line ? styles.sliderNumberSelected : styles.sliderNumber}>{line}m</Text>
            ))}
          </View>
          <Slider
            style={styles.slider}
            minimumValue={sliderStepsProps.timeStart}
            maximumValue={data.maxTime}
            step={sliderStepsProps.timeStep}
            value={props.interval}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#44CCEE"
            maximumTrackTintColor="#000000"
            thumbTintColor="#44CCEE"
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
