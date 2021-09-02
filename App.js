import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import {Dish, Menu, Table} from './src/screens/index';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import PushNotification, {Importance} from 'react-native-push-notification';

const Stack = createNativeStackNavigator();
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Chart from './src/screens/Setting/Chart/Chart';
const App = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor="#f90"
            // showHideTransition={statusBarTransition}
          />
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
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Chart" component={Chart} />
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
