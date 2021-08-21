import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import {Dish} from './src/screens/index'
import {Provider} from 'react-redux'
import store from './redux/store'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown:false,
          }}
          initialRouterName={'BottomModal'}
        >         
           <Stack.Screen name="Tabs" component={Tabs}/>  
                    <Stack.Screen name="Dish" component={Dish}/>

       
        </Stack.Navigator>

    </NavigationContainer>
    </Provider>
  )
}

export default App
