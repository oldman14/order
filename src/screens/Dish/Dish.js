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
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import RBSheet from 'react-native-raw-bottom-sheet';

const DATA = [
  {
    id: 1,
    typeName: 'Cơm',
    data: [
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
    ],
  },
];

const Dish = () => {
  const [quantity, setQuantity] = useState();
  const [cartOrder, setCartOrder] = useState([]);
  const [dishBottom, setDishBottom] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const refRBSheet = useRef();
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
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
  ]
  imageDef =
    'http://f.imgs.vietnamnet.vn/2017/12/12/15/khoi-mat-cong-ra-quan-vi-cong-thuc-com-tam-chuan-vi-nhat-ngay-day.jpg';
  const renderBottomButton = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* Bookmark */}
        <TouchableOpacity
          style={{
            width: 40,
            marginLeft: SIZES.padding,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => (quantity > 1 ? setQuantity(quantity - 1) : null)}>
          <Text>-</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.black,
              marginLeft: SIZES.padding,
              marginVertical: SIZES.base,
            }}>
            {quantity}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: 40,
            marginLeft: SIZES.padding,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
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
      <View style={styles.itemDish}>
        <View>
          <Image style={styles.image} source={dishBottom != null ? {uri: dishBottom.image} : {uri: imageDef} }/>
        </View>
        <View>
          <Text style={styles.nameDish}>{dishBottom != null ? dishBottom.dishName : "Demo"}</Text>
          <Text style={styles.price}>58.000đ</Text>
          <View></View>
        </View>
      </View>
    );
  };
  const openBottomSheet = ({item}) => {
    setDishBottom(item);
    refRBSheet.current.open();
  };
  const renderItems = ({item}) => {
    return (
      <TouchableOpacity >
        <View style={styles.itemDish}>
          <View>
            <Image style={styles.image} source={{uri: item.image}} />
          </View>
          <View>
            <Text style={styles.nameDish}>{item.productName}</Text>
            <Text style={styles.price}>58.000đ</Text>
            <View></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {/* <SectionList
        sections={DATA}
        renderItem={renderItems}
        renderSectionHeader={({section: {typeName}}) => (
          <Text style={styles.header}>{typeName}</Text>
        )}
      /> */}
    <FlatList
        data={DATA2}
        keyExtractor={item=>item.id}
        renderItem={renderItems}
        numColumns = {3}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  itemDish: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 8,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#eee',
    borderWidth: 0.5,
  },
  image: {
    margin: 10,
    width: SIZES.width / 4.5,
    height: SIZES.width / 4.5,
    borderRadius: 3,
  },
  nameDish: {
    fontSize: SIZES.h2,
    marginVertical: 8,
  },
  price: {
    fontSize: SIZES.h5,
  },
});

export default Dish;
