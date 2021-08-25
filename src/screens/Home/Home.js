import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import productApi from '../../api/productApi';
import tableApi from '../../api/tableApi';
const {width, height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const widthItem = width / 3;
  const [tableList, setTableList] = useState(null);
  useEffect(() => {
    const getTableList = async () => {
      try {
        const data = await tableApi.getAll();
        setTableList(data);
      } catch (error) {
        console.log('Failed', error);
      }
    };
    getTableList();
  }, []);

  const renderTable = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Dish', {id: item._id})}>
        <View>
          <View style={styles.tableItem}>
            <TouchableOpacity>
              <Text style={{textAlign: 'center'}}>{item.tableName}</Text>
            </TouchableOpacity>
          </View>
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
  container: {
    marginHorizontal: (width * 0.1) / 8,
  },
});

export default Home;
