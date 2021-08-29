import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import {Dish, Menu, Table} from './src/screens/index';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';

const Stack = createNativeStackNavigator();
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f90',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Dish" component={Dish} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Table" component={Table} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
