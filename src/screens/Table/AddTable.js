import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SIZES} from '../../constants';
import tableApi from '../../api/tableApi';
const AddTable = () => {
  const [text, setText] = useState((table = {tableName: ''}));
  const addTable = async () => {
    try {
      const data = await tableApi.addTable(text);
      console.log(data);
    } catch (error) {
      console.log('Failed', error);
    }
  };

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
export default AddTable;
