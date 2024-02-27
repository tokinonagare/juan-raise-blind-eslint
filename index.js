/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import ParentComponent from './App';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => ParentComponent);

