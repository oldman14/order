import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  Pressable,
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCart,
  deleteCart,
  deleteItemCart,
} from '../../../redux/actions/cartItem';
import productApi from '../../api/productApi';
import orderApi from '../../api/orderApi';
import {data} from 'browserslist';
import * as Progress from 'react-native-progress';
import styles from './Style';
import formatCurrency from '../components/formatCurrency';
const Dish = ({route, navigation}) => {
  const {id, tableName} = route.params;
  console.log('tableName', tableName);
  const [dishList, setDishList] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [dishBottom, setDishBottom] = useState(null);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const dataCart = state.filter(item => item._id === id);
  const [totalPrice, settotalPrice] = useState(0);
  const [isOrder, setIsOrder] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const confirm = () => {
    setIsOrder(!isOrder);
    // addOrder(date, total);
  };
  useEffect(() => {
    const fetchListProduct = async () => {
      const data = await productApi.getAll();
      setDishList(data);
    };
    fetchListProduct();
  }, []);
  useEffect(() => {
    let total;
    if (dataCart[0] != undefined) {
      console.log(dataCart);
      total = dataCart[0].listProduct.reduce((pre, cur) => {
        return pre + cur.product.price * cur.quantity;
      }, 0);
      settotalPrice(total);
    }
  }, [dataCart]);

  const addItem = () => {
    setQuantity(1);
    const time = new Date();

    const minutes = () => {
      const minutes = time.getMinutes();
      if (minutes < 10) {
        return '0' + minutes;
      }
      return minutes;
    };
    const hours = () => {
      const hours = time.getHours();
      if (hours < 10) {
        return '0' + hours;
      }
      return hours;
    };
    const currentTime = hours() + ':' + minutes();
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
  // variables
  useEffect(() => {
    if (dataCart[0] != undefined) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
      refRBSheet2.current.close();
    }
  }, [dataCart]);
  // callbacks
  const addOrder = async () => {
    let currentdate = new Date();
    let oneJan = new Date(currentdate.getFullYear(), 0, 1);
    let numberOfDays = Math.floor(
      (currentdate - oneJan) / (24 * 60 * 60 * 1000),
    );
    let result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    const obOrder = {
      total: totalPrice,
      listProduct: dataCart[0].listProduct,
      week: result,
    };
    try {
      setIsIndeterminate(true);
      const dataOrder = await orderApi.addOrder(obOrder);
      setIsIndeterminate(false);
      deleteCart1();
      navigation.navigate('Home');
    } catch (error) {
      console.log('Add failed', error);
    }
  };

  const renderBottomButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {/* Bookmark */}
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            marginVertical: SIZES.base,
            borderRadius: 5,
            alignItems: 'center',
            backgroundColor: '#eee',
            justifyContent: 'center',
          }}
          onPress={() => (quantity > 1 ? setQuantity(quantity - 1) : null)}>
          <Text>-</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              width: 30,
              fontSize: SIZES.h2,
              color: COLORS.black,
              marginHorizontal: 20,
              marginVertical: SIZES.base,
            }}>
            {quantity}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 5,
            marginVertical: SIZES.base,
            alignItems: 'center',
            backgroundColor: '#eee',
            justifyContent: 'center',
          }}
          onPress={() => setQuantity(quantity + 1)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderBottomSheet = () => {
    return (
      <View style={styles.bottomSheetDish}>
        <View
          style={{
            width: SIZES.width,
            height: SIZES.width / 6,
            flexDirection: 'row',
          }}>
          <View>
            <Image
              style={styles.imageBotSheet}
              source={
                dishBottom != null ? {uri: dishBottom.image} : {uri: null}
              }
            />
          </View>
          <View>
            <Text style={styles.nameDishBotSheet}>
              {dishBottom != null ? dishBottom.productName : 'Demo'}
            </Text>
            <Text style={styles.priceBotSheet}>
              {dishBottom != null ? `${formatCurrency(dishBottom.price)}` : 0}đ
            </Text>
            <View></View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            height: SIZES.height / 7,
          }}>
          <View style={{flex: 1, alignSelf: 'center'}}>
            {renderBottomButton()}
          </View>

          <TouchableOpacity
            onPress={() => addItem()}
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#f90',
            }}>
            <Text style={styles.textTouch}>Thêm món</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderBotSheetCart = () => {
    // settotalPrice(total);
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
          {dataCart[0] != undefined ? (
            <FlatList
              data={dataCart[0].listProduct}
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

  const openBottomSheet = item => {
    setDishBottom(item);
    refRBSheet.current.open();
  };
  const renderDish = ({item}) => {
    return (
      <TouchableOpacity onPress={() => openBottomSheet(item)}>
        <View style={{flex: 1}}>
          <View style={styles.tableItem}>
            <View>
              <Image style={styles.image} source={{uri: item.image}} />
            </View>
            <View>
              <Text numberOfLines={1} style={styles.nameDish}>
                {item.productName}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                {formatCurrency(item.price)}
              </Text>
              <View></View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dishList}
        keyExtractor={item => item._id}
        renderItem={renderDish}
        numColumns={3}
        contentContainerStyle={styles.containerFlat}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}>
        {renderBottomSheet()}
      </RBSheet>
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
      <TouchableOpacity
        onPress={() => refRBSheet2.current.open()}
        style={modalVisible == true ? styles.modalOrder : styles.modalOrder2}>
        <View style={styles.viewImageOrder}>
          <Image
            style={styles.imageOrder}
            source={require('../../assets/images/icons8-fondue-50.png')}
          />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.orderTitle}>Đơn hàng hiện tại</Text>
          <Text style={styles.orderText}>{formatCurrency(totalPrice)}</Text>
        </View>
      </TouchableOpacity>
      {isIndeterminate == false ? (
        <Modal animationType="slide" transparent={true} visible={isOrder}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.titleModal}>
                Bạn không thể thay đổi đơn hàng khi đã xác nhận
              </Text>
              <View style={styles.btnView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setIsOrder(!isOrder)}>
                  <Text style={styles.textStyle}>Hủy</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonAccept]}
                  onPress={() => addOrder()}>
                  <Text style={styles.textStyle}>Xác nhận</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        <Progress.Circle
          size={30}
          style={{position: 'absolute', top: 100, left: 20}}
          indeterminate={isIndeterminate}
        />
      )}
    </View>
  );
};

export default Dish;
