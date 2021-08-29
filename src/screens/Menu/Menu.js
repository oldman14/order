import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {SIZES} from '../../constants';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import productApi from '../../api/productApi';

const Menu = () => {
  const [text, setText] = useState(
    (product = {
      productName: '',
      price: '',
      imageUrl: '',
      note: '',
    }),
  );
  console.log('text cua Duong', {text});
  const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [tranfers, setTranfers] = useState();
  const refRBSheet = useRef();
  const fetchListProduct = async item => {
    console.log('log tesst', item);
    try {
      const data = await productApi.addProduct(item);
      console.log('log respone', data);
    } catch (error) {
      console.log('Failed', error);
    }
  };

  const openLibary = () => {
    refRBSheet.current.close();
    const option = {
      includeBase64: true,
      mediaType: 'photo',
    };
    launchImageLibrary(option, res => {
      console.log(res);
      if (res.didCancel) {
        console.log('Didcancle');
      }
      if (res.errorCode) {
        console.log('errorCode');
      }
      if (res.errorMessage) {
        console.log('error Message');
      } else {
        console.log(res.assets);
        if (res.assets != undefined) {
          setImg(res.assets[0].uri);
          const imageSource = {
            uri: 'data:image/jpeg;base64,' + res.assets[0].base64,
          };
          setImage(imageSource);
        }
      }
    });
  };
  const openCamera = () => {
    refRBSheet.current.close();
    const option = {
      includeBase64: true,
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 400,
    };
    launchCamera(option, res => {
      console.log(res);
      if (res.didCancel) {
        console.log('Didcancle');
      }
      if (res.errorCode) {
        console.log('errorCode');
      }
      if (res.errorMessage) {
        console.log('error Message');
      } else {
        console.log(res.assets);
        if (res.assets != undefined) {
          setImg(res.assets[0].uri);
          const imageSource = {
            uri: 'data:image/jpeg;base64,' + res.assets[0].base64,
          };
          setImage(imageSource);
        }
      }
    });
  };
  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const upPhoto = async () => {
    setIsLoading(true);
    setTranfers(0);
    const upPhotoUri = img;
    //get filename
    let fileName = upPhotoUri.substring(upPhotoUri.lastIndexOf('/') + 1); //
    const task = storage().ref(fileName).putFile(upPhotoUri);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      //số byte đã chuyển đi chia tổng byte để lấy %
      setTranfers(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    try {
      await task;
      setIsLoading(false);
      let url = await storage().ref(fileName).getDownloadURL();
      setText({...text, imageUrl: url});
      const dataMenu = {...text, imageUrl: url};
      console.log('logdata menu', dataMenu);
      fetchListProduct(dataMenu);
      setText({...text, productName: '', price: '', imageUrl: '', note: ''});
      setImage(null);
      createThreeButtonAlert();
    } catch (error) {
      console.log('Upload Img', error);
    }
  };
  const renderBottomSheet = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.imageBottomSheet}
          onPress={() => openLibary()}>
          <Text style={styles.imagePickTitle}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageBottomSheet}
          onPress={() => openCamera()}>
          <Text style={styles.imagePickTitle}>OpenCamera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageBottomSheet}
          onPress={() => refRBSheet.current.close()}>
          <Text style={styles.imagePickTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      enabled
      keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.section_box}>
            <Text style={styles.title}>Tên sản phẩm</Text>
            <TextInput
              style={styles.input}
              onChangeText={item => setText({...text, productName: item})}
              value={text.productName}
            />
          </View>
          <View style={styles.section_box}>
            <Text style={styles.title}>Giá sản phẩm</Text>
            <TextInput
              style={styles.input}
              onChangeText={item => setText({...text, price: item})}
              value={text.price}
            />
          </View>
          <View style={styles.section_box}>
            <Text style={styles.title}>Ảnh</Text>
            <View>
              {isLoading ? (
                <View>
                  <Text>{tranfers} % complete</Text>
                  <ActivityIndicator size="large" color="#f90" />
                </View>
              ) : (
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <View style={styles.imageProductBox}>
                    <Image style={styles.imageProduct} source={image} />
                    <View style={styles.imageIconBox}>
                      <Image
                        style={styles.imageIcon}
                        source={require('../../assets/images/icons8-camera-48.png')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.section_box}>
            <Text style={styles.title}>Ghi chú</Text>
            <TextInput
              style={styles.input}
              onChangeText={item => setText({product: {note: item}})}
              value={text.note}
            />
          </View>

          <TouchableOpacity
            onPress={() => upPhoto()}
            style={styles.btnAddProduct}>
            <Text style={styles.btnAddProductTitle}>THÊM MÓN</Text>
          </TouchableOpacity>
        </View>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  section: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  section_box: {
    margin: 12,
  },
  title: {
    fontSize: SIZES.body3,
  },
  input: {
    height: 50,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#000',
  },
  imageBottomSheet: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  imagePickTitle: {
    fontSize: SIZES.body2,
  },
  imageProduct: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageProductBox: {
    alignSelf: 'center',
    borderColor: '#000',
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageIcon: {
    width: 15,
    height: 15,
  },
  imageIconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  imagePick: {
    position: 'absolute',
  },
  btnAddProduct: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f90',
    marginHorizontal: 8,
    marginVertical: 12,
    borderRadius: 8,
  },
  btnAddProductTitle: {
    fontSize: SIZES.body3,
    color: '#fff',
  },
});
export default Menu;
