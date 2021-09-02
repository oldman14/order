import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Dimensions} from 'react-native';
import productApi from '../../api/productApi';
import tableApi from '../../api/tableApi';
const {width, height} = Dimensions.get('window');
import {useSelector} from 'react-redux';
import {SIZES} from '../../constants';
import PushNotification, {Importance} from 'react-native-push-notification';

const Home = ({navigation}) => {
  const [tableList, setTableList] = useState(null);
  const state = useSelector(state => state.cart);
  const testPush = () => {
    PushNotification.localNotification({
      channelId: 'channel-id',
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  };
  useEffect(() => {
    const getTableList = async () => {
      try {
        const data = await tableApi.getAll();
        console.log('log data table', data);
        setTableList(data);
      } catch (error) {
        console.log('Get table failed', error);
      }
    };
    getTableList();
    const pushNoti = () => {
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        channelId: 'channel-id',
        message: 'My Notification Message', // (required)
        date: new Date(Date.now() + 10 * 1000), // in 60 secs
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

        /* Android Only Properties */
        repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      });
      console.log('on push noti');
    };
    pushNoti();
  }, []);
  console.log('log table list', tableList);
  const renderTable = ({item}) => {
    const isOrder = state.findIndex(itemId => itemId._id == item._id);
    return (
      <TouchableOpacity
        onPress={
          () =>
            navigation.navigate('Dish', {
              id: item._id,
              tableName: item.tableName,
            })
          // testPush()
        }>
        <View>
          {isOrder >= 0 ? (
            <View style={styles.tableItem2}>
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: SIZES.body2,
                  }}>
                  {item.tableName}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.tableItem}>
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: SIZES.body2,
                    color: '#000',
                  }}>
                  {item.tableName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.containerFlatList}
        data={tableList}
        renderItem={renderTable}
        keyExtractor={item => item._id}
        numColumns={3}
      />
      <TouchableOpacity style={{width: 100, height: 30}}>
        <Text>Test Push</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tableItem: {
    justifyContent: 'center',
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: (width * 0.1) / 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tableItem2: {
    justifyContent: 'center',
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#f90',
    marginVertical: 5,
    marginHorizontal: (width * 0.1) / 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerFlatList: {
    marginHorizontal: (width * 0.1) / 8,
    marginTop: (width * 0.1) / 8,
  },
  container: {
    backgroundColor: '#eee',
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default Home;
