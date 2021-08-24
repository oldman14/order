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
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {addCart, deleteCart, deleteItemCart} from '../../../redux/actions/cartItem';
const DATA2 = [
  {
    id: 1,
    productName: 'Cơm tấm',
    image:
      'https://cdn.daynauan.info.vn/wp-content/uploads/2019/05/com-tam-la-mon-an-binh-dan.jpg',
  },
  {
    id: 2,
    productName: 'Cơm cá kho',
    image:
      'https://cdn.daynauan.info.vn/wp-content/uploads/2019/05/com-tam-la-mon-an-binh-dan.jpg',
  },
  {
    id: 3,
    productName: 'Cơm cá chiên',
    image:
      'http://f.imgs.vietnamnet.vn/2017/12/12/15/khoi-mat-cong-ra-quan-vi-cong-thuc-com-tam-chuan-vi-nhat-ngay-day.jpg',
  },
  {
    id: 4,
    productName: 'Cơm tấm',
    image:
      'https://cdn.daynauan.info.vn/wp-content/uploads/2019/05/com-tam-la-mon-an-binh-dan.jpg',
  },
  {
    id: 5,
    productName: 'Cơm cá kho',
    image:
      'https://cdn.daynauan.info.vn/wp-content/uploads/2019/05/com-tam-la-mon-an-binh-dan.jpg',
  },
  {
    id: 6,
    productName: 'Cơm cá chiên',
    image:
      'http://f.imgs.vietnamnet.vn/2017/12/12/15/khoi-mat-cong-ra-quan-vi-cong-thuc-com-tam-chuan-vi-nhat-ngay-day.jpg',
  },
  {
    id: 7,
    productName: 'Cơm tấm',
    image:
      'https://cdn.daynauan.info.vn/wp-content/uploads/2019/05/com-tam-la-mon-an-binh-dan.jpg',
  },
  {
    id: 8,
    productName: 'Cơm cá kho',
    image:
      'https://cdn.daynauan.info.vn/wp-content/uploads/2019/05/com-tam-la-mon-an-binh-dan.jpg',
  },
  {
    id: 9,
    productName: 'Cơm cá chiên',
    image:
      'http://f.imgs.vietnamnet.vn/2017/12/12/15/khoi-mat-cong-ra-quan-vi-cong-thuc-com-tam-chuan-vi-nhat-ngay-day.jpg',
  },
];

const Dish = ({route, navigation}) => {
  const {id} = route.params;
  console.log('log id', id);
  const [quantity, setQuantity] = useState(1);
  const [dataOrder, setDataOrder] = useState();
  const [dishBottom, setDishBottom] = useState(null);
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const bottomSheetModalRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state.cart);
  console.log('log state', state);
  const [modalVisible, setModalVisible] = useState(false);
  const dataCart = state.filter(item => item.id === id);
  const addItem = () => {
    const cart = {
      id: id,
      listProduct: [{product: dishBottom, quantity: quantity}],
    };
    dispatch(addCart(cart));
  };
  const deleteCart1 =()=>{
    const cart = {
      id: id
    }
    dispatch(deleteCart(cart))
  }
  const deleteItem=(item)=>{  
    const cart = {
      id: id, 
      product: item
    }
    dispatch(deleteItemCart(cart))
  }
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
  imageDef =
    'http://f.imgs.vietnamnet.vn/2017/12/12/15/khoi-mat-cong-ra-quan-vi-cong-thuc-com-tam-chuan-vi-nhat-ngay-day.jpg';
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
            <Text style={styles.priceBotSheet}>58.000đ</Text>
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
    const renderItemCart = ({item}) => {
      console.log("object", item)
      return (
        <TouchableOpacity onPress={()=> deleteItem(item)}>
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
            <Text style={{fontSize: SIZES.body2}}>88.000đ</Text>
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
            <TouchableOpacity>
              <Text style={styles.cart_addTitle}>Thêm</Text>
            </TouchableOpacity>
          </View>
          {dataCart[0] != undefined ? (
            <FlatList
              data={dataCart[0].listProduct}
              keyExtractor={item => item.product.id}
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
            <Text style={{flex: 3, fontSize: SIZES.body2, textAlign:'right'}}>182.000đ</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>deleteCart1()}>
        <View style={styles.cart_delete}>
          <Image style={{width: 30, height: 30}} source={require('../../assets/images/icons8_delete.png')}/>
          <Text style={{paddingHorizontal: 10, fontSize: SIZES.body3, alignSelf: 'center'}}>Xóa đơn hàng</Text>
        </View>
        </TouchableOpacity>
    
        <View style={styles.cart_acceptContainer}>
          <View
            style={{justifyContent: 'center', flex: 8, paddingHorizontal: 10}}>
            <Text style={styles.orderTitle}>Giỏ hàng hiện tại</Text>
            <Text style={styles.orderText}>172.000d</Text>
          </View>
          <TouchableOpacity style={{height: 40, alignSelf: 'center'}}>
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
  const renderItems = ({item}) => {

    return (
      <TouchableOpacity onPress={() => openBottomSheet(item)}>
        <View style={{flex: 1}}>
          <View style={styles.tableItem}>
            <View>
              <Image style={styles.image} source={{uri: item.image}} />
            </View>
            <View>
              <Text style={styles.nameDish}>{item.productName}</Text>
              <Text style={styles.price}>58.000đ</Text>
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
        data={DATA2}
        keyExtractor={item => item.id}
        renderItem={renderItems}
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
        style={{flex: 1}}>
        <View
          style={modalVisible == true ? styles.modalOrder : styles.modalOrder2}>
          <View style={styles.viewImageOrder}>
            <Image
              style={styles.imageOrder}
              source={require('../../assets/images/icons8-fondue-50.png')}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.orderTitle}>Giỏ hàng hiện tại</Text>
            <Text style={styles.orderText}>172.000d</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: '#eee',
    position: 'absolute',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  bottomSheetDish: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginHorizontal: 8,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#eee',
    borderWidth: 0.5,
  },
  imageBotSheet: {
    alignSelf: 'center',
    margin: 5,
    width: SIZES.width / 5,
    height: SIZES.width / 5,
    borderRadius: 3,
  },
  nameDishBotSheet: {
    color: 'black',
    margin: 5,
    alignSelf: 'center',
    fontSize: SIZES.h2,
  },
  priceBotSheet: {
    marginHorizontal: 5,
    fontSize: SIZES.h3,
  },
  image: {
    alignSelf: 'center',
    margin: 5,
    width: SIZES.width / 8,
    height: SIZES.width / 8,
    borderRadius: 3,
  },
  nameDish: {
    color: 'black',
    alignSelf: 'center',
    fontSize: SIZES.h3,
  },
  price: {
    alignSelf: 'center',
    fontSize: SIZES.h5,
  },
  tableItem: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    marginVertical: 5,
    marginHorizontal: (SIZES.width * 0.1) / 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  containerFlat: {
    marginHorizontal: (SIZES.width * 0.1) / 8,
  },
  textTouch: {
    textAlign: 'center',
    fontSize: SIZES.body2,
    color: COLORS.white,
  },
  modalOrder: {
    flexDirection: 'row',
    width: SIZES.width - 20,
    height: 80,
    marginHorizontal: 10,
    backgroundColor: '#f90',
    position: 'absolute',
    bottom: -100,
    right: 0,
    left: 0,
    borderRadius: 3,
  },
  modalOrder2: {
    flexDirection: 'row',
    width: SIZES.width - 20,
    height: 80,
    marginHorizontal: 10,
    backgroundColor: '#f90',
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
    borderRadius: 3,
  },
  viewImageOrder: {
    justifyContent: 'center',
    padding: 10,
  },
  imageOrder: {
    alignContent: 'center',
  },
  orderTitle: {
    fontSize: SIZES.body2,
    color: '#fff',
  },
  orderText: {
    fontSize: SIZES.body3,
    color: '#fff',
  },
  cart_container: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: '#ddd',
  },
  cart_cancel: {
    width: 18,
    height: 18,
    marginHorizontal: 8,
    alignSelf: 'center',
    right: 0,
  },
  cart_viewCancel: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  cart_title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold'
  },
  cart_section1: {
    width: SIZES.width,
    backgroundColor:'#fff',
    marginTop: 10
  },
  cart_titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  cart_titleListOrder: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  cart_addTitle: {
    padding: 5,
    backgroundColor: '#FFA54F',
    borderRadius: 5,
    color: '#fff',
  },
  cart_section1_cartItem: {
    flex: 8,
    flexDirection: 'column',
  },
  cart_acceptContainer: {
    flexDirection: 'row',
    width: SIZES.width,
    height: 80,
    backgroundColor: '#f90',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 3,
  },
  cart_btnPay: {
    flex: 2.5,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#f90',
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
  cart_totalMoney: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 10,
    paddingBottom: 10

  },
  cart_totalMoney_title:{
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  cart_delete:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical:10,
    marginTop: 10
  }
  
});

export default Dish;
