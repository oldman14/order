import {StyleSheet} from 'react-native';
import {SIZES} from '../../../constants';
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
    marginTop: (width * 0.1) / 6,
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

export default styles;
