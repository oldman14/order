import React from 'react';
import {View, Text} from 'react-native';
import SignInScreen from './../screens/signin/SignIn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  console.log('AuthStack');
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="SignIn"
        component={SignInScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
