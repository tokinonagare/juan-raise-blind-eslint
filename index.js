/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import MyComponent from './App';
import {name as appName} from './app.json';

import { Provider } from 'react-redux';
import store from './store';


const mystore = store;
console.log(store)
const ReduxApp = () => (
    <Provider store={mystore}>
      <MyComponent />
    </Provider>
  );

AppRegistry.registerComponent(appName, () => ReduxApp);

