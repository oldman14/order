import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const listTable = [
  {id: 1, tableName: 'L1'},
  {id: 2, tableName: 'L2'},
  {id: 3, tableName: 'L3'},
  {id: 4, tableName: 'L4'},
  {id: 5, tableName: 'L5'},
  {id: 6, tableName: 'L6'},
  {id: 7, tableName: 'L7'},
  {id: 8, tableName: 'L8'},
];

const Home = ({navigation }) => {
  const widthItem = width / 3;

  const renderTable = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={()=>navigation.navigate('Dish',{id: item.id})}
      >
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
        data={listTable}
        renderItem={renderTable}
        keyExtractor={item => item.id}
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
