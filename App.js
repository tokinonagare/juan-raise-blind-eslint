/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectBlindsIntervalComponent from './src/select-blinds-Interval/controller/SelectBlindsIntervalComponent';
import PreviewBlindsStructureComponent from './src/preview-blinds-structure/controller/PreviewBlindsStructureComponent';

const Stack = createStackNavigator();

const ParentComponent = () => {
    const SelectBlindsIntervalProps = {
        data: {
            gameTime: { minute: 0, second: 0 },
            smallBlind: { blind1: 1, blind2: 2 },
        },
    };
    const titleHome = 'Home';
    const titleBlindsStructure = 'Preview Blinds Structure';
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={SelectBlindsIntervalComponent}
                    options={{
                        title: titleHome,
                    }}
                    initialParams={SelectBlindsIntervalProps}
                />
                <Stack.Screen
                    name="PreviewBlindsStructure"
                    component={PreviewBlindsStructureComponent}
                    options={{
                        title: titleBlindsStructure,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ParentComponent;
