import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import {SIZES} from '../../constants';
import tableApi from '../../api/tableApi';

const {width, height} = SIZES;

const EditTable = () => {
  const [tableList, setTableList] = useState(null);
  useEffect(() => {
    const getTableList = async () => {
      try {
        const data = await tableApi.getAll();
        setTableList(data);
      } catch (error) {
        console.log('Failed', error);
      }
    };
    getTableList();
  }, []);
  const [dataTable, setDataTable] = useState({id: null, tableName: ''});
  const [modalVisible, setModalVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const renderEdit = item => {
    setDataTable(item);
    setModalVisible(!modalVisible);
  };
  const upDateTable = async () => {
    setModalVisible(!modalVisible);
    try {
      const data = await tableApi.editTable(dataTable);
      setTableList(data);
      console.log(data);
    } catch (error) {
      console.log('Failed update table', error);
    }
  };
  const renderDelete = item => {
    console.log('data delete', item);
    setIsDelete(!isDelete);
    setDataTable(item);
  };
  const deleteTable = async () => {
    console.log('dadataTabletaTable', dataTable);
    setIsDelete(!isDelete);
    try {
      let data = await tableApi.deleteTable(dataTable);
      setDataTable(data);
    } catch (error) {
      console.log('Delete fail', error);
    }
  };
  console.log(dataTable);
  const renderTable = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onLongPress={() => renderDelete(item)}
          onPress={() => renderEdit(item)}>
          <View style={styles.tableItem}>
            <Text style={{textAlign: 'center'}}>{item.tableName}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        data={tableList}
        renderItem={renderTable}
        keyExtractor={item => item._id}
        numColumns={3}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalTextInput}
              value={dataTable.tableName}
              onChangeText={item =>
                setDataTable({...dataTable, tableName: item})
              }
            />
            <View style={styles.btnView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonAccept]}
                onPress={() => upDateTable()}>
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={isDelete}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Bạn muốn xóa bàn {dataTable.tableName}</Text>
            <View style={styles.btnView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsDelete(!isDelete)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonAccept]}
                onPress={() => deleteTable()}>
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  tableItem: {
    justifyContent: 'center',
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#ccc',
    marginVertical: 5,
    marginHorizontal: (width * 0.1) / 8,
  },
  container: {
    marginHorizontal: (width * 0.1) / 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    elevation: 2,
  },
  buttonAccept: {
    backgroundColor: '#f90',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTextInput: {
    borderColor: '#ddd',
    height: 50,
    borderWidth: 0.5,
    width: width / 2,
    color: '#000',
  },
  btnView: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
export default EditTable;
