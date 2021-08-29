import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import productApi from '../../api/productApi';
import tableApi from '../../api/tableApi';
const {width, height} = Dimensions.get('window');
import {useSelector} from 'react-redux';
import {SIZES} from '../../constants';
const Home = ({navigation}) => {
  console.log('date + day');
  const widthItem = width / 3;
  const [tableList, setTableList] = useState(null);
  const state = useSelector(state => state.cart);
  // console.log('log order', state[0].listProduct);
  useEffect(() => {
    const getTableList = async () => {
      try {
        const data = await tableApi.getAll();
        setTableList(data);
      } catch (error) {
        console.log('Get table failed', error);
      }
    };
    getTableList();
  }, []);

  const renderTable = ({item, index}) => {
    const isOrder = state.findIndex(itemId => itemId._id == item._id);
    const tableStyle = '';

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Dish', {id: item._id})}>
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
                <Text style={{textAlign: 'center', fontSize: SIZES.body2}}>
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
    <View>
      <FlatList
        contentContainerStyle={styles.container}
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
    backgroundColor: '#ccc',
    marginVertical: 5,
    marginHorizontal: (width * 0.1) / 8,
  },
  tableItem2: {
    justifyContent: 'center',
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#f90',
    marginVertical: 5,
    marginHorizontal: (width * 0.1) / 8,
  },
  container: {
    marginHorizontal: (width * 0.1) / 8,
  },
});

export default Home;
