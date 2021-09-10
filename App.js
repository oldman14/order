import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './redux/store';
import Routes from './src/navigation/Routes';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.import SignInScreen from './src/screens/signin/SignIn';
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
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) {
    console.log(isLoading);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#f90',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('./src/assets/images/bill.png')}
          style={{width: 100, height: 100}}
        />
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
};

export default App;
