import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Home, Ordered, Setting} from '../screens/index';

const Tab = createMaterialBottomTabNavigator();

const tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="#ddd"
      barStyle={{backgroundColor: '#f90'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              style={{
                color: focused ? '#fff' :'#ddd',
              }}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ordered"
        component={Ordered}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="order-bool-descending-variant"
              style={{
                color: focused ? '#fff' :'#ddd',
              }}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="menu"
              style={{
                color: focused ?  '#fff' :'#ddd',
              }}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default tabs;
