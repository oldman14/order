import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Home, Ordered, Setting} from '../screens/index';
import {Dish, Menu, Table} from '../screens/index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chart from './../screens/Setting/Chart/Chart';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#f90'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Dish" component={Dish} />
    </Stack.Navigator>
  );
};
const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#f90'},
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="Chart" component={Chart} />
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
};
const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      activeColor="#fff"
      inactiveColor="#ddd"
      barStyle={{backgroundColor: '#f90'}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              style={{
                color: focused ? '#fff' : '#ddd',
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
          title: 'Ordered',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="order-bool-descending-variant"
              style={{
                color: focused ? '#fff' : '#ddd',
              }}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{
          title: 'Setting',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="menu"
              style={{
                color: focused ? '#fff' : '#ddd',
              }}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
