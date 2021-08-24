import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import productApi from '../../api/productApi';

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
const getMoviesFromApi = () => {
  return fetch('http://192.168.171.2:3000')
    .then((response) => response.json())
    .then((json) => {
      return json.movies;
    })
    .catch((error) => {
      console.error(error);
    });
};

const Home = ({navigation }) => {
  const widthItem = width / 3;
  useEffect(() => {
    const fetchListProduct = async() =>{
      try {
        const data = await productApi.getAll();
        console.log(data)
      } catch (error) {
        console.log("Failed", error)
      }
    }
    // const getMoviesFromApiAsync = async () => {
    //   try {
    //     const response = await fetch(
    //       `${RN_APP_API_URL}/product`
    //     );
    //     const json = await response.json();
    //     console.log(json)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    
    fetchListProduct();
  }, [])
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
