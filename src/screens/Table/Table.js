import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AddTable from './AddTable/AddTable';
import EditTable from './EditTable/EditTable';

const Tab = createMaterialTopTabNavigator();

const Table = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {backgroundColor: '#f90'},
        tabBarIndicatorStyle: {backgroundColor: '#fff'},
        tabBarLabelStyle: {fontWeight: 'bold'},
      }}>
      <Tab.Screen name="AddTable" component={AddTable} />
      <Tab.Screen name="EditTable" component={EditTable} />
    </Tab.Navigator>
  );
};

export default Table;
