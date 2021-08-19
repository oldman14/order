import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useState, useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../../redux/actions/cartItem';

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
  console.log("log id", id)
  const [quantity, setQuantity] = useState(1);
  const [cartOrder, setCartOrder] = useState([]);
  const [dishBottom, setDishBottom] = useState(null);
  const refRBSheet = useRef();
  const bottomSheetModalRef = useRef(null);
  const [data, setData] = useState(DATA2);
   const dispatch = useDispatch();
   const state = useSelector(state => state.cart)
   console.log("log state",state)
   const addItem = () =>{
    const cart = {product: dishBottom, quantity : quantity, id: id}
    dispatch(addCart(cart));
  } 
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  
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
              marginHorizontal:20,
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
          <View style={{flex: 1, alignSelf:'center'}}>{renderBottomButton()}</View>

          <TouchableOpacity
          onPress={()=>addItem()}
            style={{flex: 1, justifyContent: 'center', backgroundColor: '#f90'}}>
                <Text style={styles.textTouch}>Thêm món</Text>
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
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}>
      <Text>Swipe down to close</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* <SectionList
        sections={DATA}
        renderItem={renderItems}
        renderSectionHeader={({section: {typeName}}) => (
          <Text style={styles.header}>{typeName}</Text>
        )}
      /> */}
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
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {renderBottomSheet()}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
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
      color: COLORS.white
  }
});

export default Dish;
