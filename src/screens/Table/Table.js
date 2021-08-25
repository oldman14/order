import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AddTable from './AddTable';
import EditTable from './EditTable';

const Tab = createMaterialTopTabNavigator();

const Table = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AddTable" component={AddTable} />
      <Tab.Screen name="EditTable" component={EditTable} />
    </Tab.Navigator>
  );
};

export default Table;
