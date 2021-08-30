import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import productApi from '../../api/productApi';
import tableApi from '../../api/tableApi';
const {width, height} = Dimensions.get('window');
import {useSelector} from 'react-redux';
import {SIZES} from '../../constants';
const Home = ({navigation}) => {
  const [tableList, setTableList] = useState(null);
  const state = useSelector(state => state.cart);
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
        onPress={() =>
          navigation.navigate('Dish', {id: item._id, tableName: item.tableName})
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
