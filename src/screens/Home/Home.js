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
import styles from './Style';
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
    </View>
  );
};

export default Home;
