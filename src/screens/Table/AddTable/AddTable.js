import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SIZES} from '../../../constants';
import tableApi from '../../../api/tableApi';
const AddTable = () => {
  const [text, setText] = useState((table = {tableName: ''}));
  const addTable = async () => {
    console.log('text.tableName,', text);
    if (text.tableName.length) {
      try {
        const data = await tableApi.addTable(text);
        console.log(data);
      } catch (error) {
        console.log('Failed', error);
      }
    } else {
      createTwoButtonAlert();
    }
  };
  const createTwoButtonAlert = () =>
    Alert.alert('Cảnh báo', 'Không để trống tên bàn ', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  return (
    <View>
      <View style={styles.section_box}>
        <Text style={styles.title}>Tên bàn</Text>
        <TextInput
          style={styles.input}
          onChangeText={item => setText({...text, tableName: item})}
          value={text.tableName}
        />
      </View>
      <TouchableOpacity onPress={() => addTable()} style={styles.btnAddProduct}>
        <Text style={styles.btnAddProductTitle}>THÊM BÀN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTable;
