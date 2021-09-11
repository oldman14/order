import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SIZES} from '../../constants';
import {useSelector} from 'react-redux';
import formatCurrency from '../components/formatCurrency';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './Style';
const Ordered = () => {
  const state = useSelector(state => state.cart);
  const refRBSheet2 = useRef();
  const [dataCart, setdataCart] = useState();
  const [totalPrice, settotalPrice] = useState(0);
  useEffect(() => {
    refRBSheet2.current.close();
  }, []);
  const renderItemCart = ({item}) => {
    let total = item.listProduct.reduce((pre, cur) => {
      return pre + cur.product.price * cur.quantity;
    }, 0);
    // settotalPrice(total);
    return (
      <TouchableOpacity onPress={() => renderCart(item)}>
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
      </TouchableOpacity>
    );
  };

  const renderCart = item => {
    console.log('log cattytytzxczxc', item);
    setdataCart(item);
    refRBSheet2.current.open();
  };
  const addItem = () => {
    setQuantity(1);
    const time = new Date();
    const minutes = time.getMinutes();
    const hours = time.getHours();
    const currentTime = hours + ':' + minutes;
    refRBSheet.current.close();
    const cart = {
      _id: id,
      listProduct: [{product: dishBottom, quantity: quantity}],
      tableName: tableName,
      time: currentTime,
      total: totalPrice,
    };
    dispatch(addCart(cart));
  };
  const deleteCart1 = () => {
    const cart = {
      _id: id,
    };
    dispatch(deleteCart(cart));
  };
  const deleteItem = item => {
    const cart = {
      _id: id,
      product: item,
    };
    dispatch(deleteItemCart(cart));
  };

  const renderBotSheetCart = () => {
    // settotalPrice(total);
    // let totalPrice = dataCart.listProduct.reduce((pre, cur) => {
    //   return pre + cur.product.price * cur.quantity;
    // }, 0);
    console.log('log cart', dataCart);
    const renderItemCart = ({item}) => {
      console.log('object', item);
      return (
        <TouchableOpacity onPress={() => deleteItem(item)}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderBottomColor: '#eee',
              borderBottomWidth: 0.5,
            }}>
            <View style={styles.cart_section1_cartItem}>
              <Text style={{fontSize: SIZES.body2, fontWeight: 'bold'}}>
                {item.quantity + 'x' + ' ' + item.product.productName}
              </Text>
              <Text>Vừa</Text>
            </View>
            <View style={{justifyContent: 'space-between'}}>
              <Text style={{fontSize: SIZES.body2}}>
                {formatCurrency(item.product.price)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.cart_container}>
        <View style={styles.cart_viewCancel}>
          <Text style={styles.cart_title}>XÁC NHẬN ĐƠN HÀNG</Text>
          {/* <Image
            style={styles.cart_cancel}
            source={require('../../assets/images/cancel.png')}
          /> */}
        </View>
        <View style={styles.cart_section1}>
          <View style={styles.cart_titleSection}>
            <Text style={styles.cart_titleListOrder}>Các sản phẩm đã chọn</Text>
            <TouchableOpacity onPress={() => refRBSheet.current.close()}>
              <Text style={styles.cart_addTitle}>Thêm</Text>
            </TouchableOpacity>
          </View>
          {dataCart != undefined ? (
            <FlatList
              data={dataCart.listProduct}
              keyExtractor={item => item.product._id}
              renderItem={renderItemCart}
            />
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.cart_totalMoney}>
          <Text style={styles.cart_totalMoney_title}>Tổng cộng</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 7, fontSize: SIZES.body2}}>Thành tiền</Text>
            <Text style={{flex: 3, fontSize: SIZES.body2, textAlign: 'right'}}>
              {formatCurrency(totalPrice)}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => deleteCart1()}>
          <View style={styles.cart_delete}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../assets/images/icons8_delete.png')}
            />
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: SIZES.body3,
                alignSelf: 'center',
              }}>
              Xóa đơn hàng
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.cart_acceptContainer}>
          <View
            style={{justifyContent: 'center', flex: 8, paddingHorizontal: 10}}>
            <Text style={styles.orderTitle}>Đơn hàng hiện tại</Text>
            <Text style={styles.orderText}>{formatCurrency(totalPrice)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => confirm()}
            style={{height: 40, alignSelf: 'center'}}>
            <Text style={styles.cart_btnPay}>Thanh Toán</Text>
          </TouchableOpacity>
        </View>
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
      <RBSheet
        ref={refRBSheet2}
        height={SIZES.height}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}>
        {renderBotSheetCart()}
      </RBSheet>
    </View>
  );
};

export default Ordered;
