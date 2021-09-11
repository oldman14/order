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
  Alert,
} from 'react-native';
import {SIZES} from '../../../constants';
import tableApi from '../../../api/tableApi';

const {width, height} = SIZES;

const EditTable = () => {
  const [tableList, setTableList] = useState(null);
  const [dataTable, setDataTable] = useState({id: null, tableName: ''});
  const [modalVisible, setModalVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
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

  const renderEdit = item => {
    setDataTable(item);
    setModalVisible(!modalVisible);
  };
  const upDateTable = async () => {
    if (dataTable.tableName.length > 1) {
      setModalVisible(!modalVisible);
      try {
        const data = await tableApi.editTable(dataTable);
        setTableList(data);
      } catch (error) {
        console.log('Failed update table', error);
      }
    } else {
      createTwoButtonAlert();
    }
  };
  const createTwoButtonAlert = () =>
    Alert.alert('Cảnh báo', 'Không để trống tên bàn ', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  const renderDelete = item => {
    console.log('data delete', item);
    setIsDelete(!isDelete);
    setDataTable(item);
  };
  const deleteTable = async () => {
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
            <Text style={{textAlign: 'center', fontSize: SIZES.body2}}>
              {item.tableName}
            </Text>
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

export default EditTable;
