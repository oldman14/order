import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {SIZES} from '../../constants';
import {useSelector} from 'react-redux';
import formatCurrency from '../component/formatCurrency';
const Ordered = () => {
  const state = useSelector(state => state.cart);

  const renderItemCart = ({item}) => {
    let total = item.listProduct.reduce((pre, cur) => {
      return pre + cur.product.price * cur.quantity;
    }, 0);
    return (
      <View style={styles.section}>
        <Image
          style={styles.section_image}
          source={require('./../../assets/images/icons8-table-64.png')}
        />
        <View style={styles.section_midbox}>
          <Text style={styles.section_tableName}>
            Vị trí bàn: {item.tableName}
          </Text>
          <Text style={styles.section_quantity}>
            {item.listProduct.length} món
          </Text>
          <Text style={styles.section_dishName}>{formatCurrency(total)}</Text>
        </View>
        <Text style={styles.section_time}>{item.time}</Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={state}
        renderItem={renderItemCart}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    width: SIZES.width - 20,
    height: 100,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  section_image: {
    flex: 1,
    width: 40,
    height: 40,
    margin: 20,
    alignSelf: 'center',
  },
  section_midbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 8,
  },
  section_tableName: {
    fontSize: SIZES.h2,
  },
  section_time: {
    flex: 2,
    alignSelf: 'center',
    fontSize: SIZES.body2,
  },
  section_quantity: {
    fontSize: SIZES.body3,
  },
  section_dishName: {
    fontSize: SIZES.body3,
  },
});
export default Ordered;
