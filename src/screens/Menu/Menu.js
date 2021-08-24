import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SIZES} from '../../constants';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
const Menu = () => {
  const [text, onChangeText] = useState();
  const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [tranfers, setTranfers] = useState();
  const openCamera = () => {
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
        if(res.assets!= undefined){
            setImg(res.assets[0].uri);
            const imageSource = {
              uri: 'data:image/jpeg;base64,' + res.assets[0].base64,
            };
            setImage(imageSource);
        }
     
      }
    });
  };
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
      Alert.alert('Image Uploaded', 'Image upload successful');
    } catch (error) {
      console.log('Upload Img', error);
    }
    setImg(null)
  };
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.section_box}>
          <Text style={styles.title}>Tên sản phẩm</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.section_box}>
          <Text style={styles.title}>Giá sản phẩm</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={styles.section_box}>
          <Text style={styles.title}>Ảnh</Text>
          <View>
            <Text>Thêm ảnh sản phẩm</Text>
            {isLoading ? (
              <View>
                <Text>{tranfers} % complete</Text>
                <ActivityIndicator size="large" color="#f90" />
              </View>
            ) : (
                <TouchableOpacity onPress={() => openCamera()}>
              <Image style={{width: 50, height: 50}} source={image} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={()=>openCamera()}>
                <Text>Chọn ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section_box}>
          <Text style={styles.title}>Ghi chú</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  section: {
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
    height: 40,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 10,
  },
});
export default Menu;
