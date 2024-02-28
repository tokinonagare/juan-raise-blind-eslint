/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectBlindsIntervalComponent from './src/select-blinds-Interval/controller/SelectBlindsIntervalComponent';
import PreviewBlindsStructureComponent from './src/preview-blinds-structure/controller/PreviewBlindsStructureComponent';

const Stack = createStackNavigator();

const ParentComponent = () => {
  const Title_Home = 'Home';
  const Title_BlindsStructure = 'Preview Blinds Structure';
  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={SelectBlindsIntervalComponent}
      options={{
      title: Title_Home,
      }}
    />
    <Stack.Screen
      name="PreviewBlindsStructure"
      component={PreviewBlindsStructureComponent}
      options={{
      title: Title_BlindsStructure,
      }}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default ParentComponent;
