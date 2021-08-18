import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import {Dish} from './src/screens/index'
import BottomModal from './src/screens/Dish/BottomModal';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown:false,
          }}
          initialRouterName={'BottomModal'}
        >           
                    <Stack.Screen name="Dish" component={Dish}/>

        <Stack.Screen name="BottomModal" component={BottomModal}/>
          <Stack.Screen name="Tabs" component={Tabs}/>
        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App
