/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PreviewBlindsStructureComponent from './src/preview-blinds-structure/controller/PreviewBlindsStructureComponent';
import ParentComponent from './src/parent/controller/ParentComponent';

const Stack = createStackNavigator();

const App = () => {
    const titleHome = 'Home';
    const titleBlindsStructure = 'Preview Blinds Structure';
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={ParentComponent}
                    options={{
                        title: titleHome,
                    }}
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

export default App;
