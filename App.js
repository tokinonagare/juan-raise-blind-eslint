/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PreviewBlindsStructureComponent from './src/preview-blinds-structure/controller/PreviewBlindsStructureComponent';
import ParentComponent from './src/parent/controller/ParentComponent';
import Localization from './lib/localization/Localization';

const Stack = createStackNavigator();

const App = () => {
    const titleHome = Localization.translate('home_label');
    const titleBlindsStructure = Localization.translate('preview_blinds_structure_label');
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
