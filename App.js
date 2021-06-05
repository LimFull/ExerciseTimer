import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import './global';
import {Provider} from 'react-redux';
import store from './view/store';

import Home from './view/Home';
import Settings from './view/Settings';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="타이머" component={Home} />
          {/* <Tab.Screen name="설정" component={Settings} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
