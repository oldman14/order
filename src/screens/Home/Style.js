import {StyleSheet} from 'react-native';
import {SIZES} from '../../constants';
const {width, height} = SIZES;
const styles = StyleSheet.create({
  tableItem: {
    justifyContent: 'center',
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: (width * 0.1) / 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tableItem2: {
    justifyContent: 'center',
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#f90',
    marginVertical: 5,
    marginHorizontal: (width * 0.1) / 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerFlatList: {
    marginHorizontal: (width * 0.1) / 8,
    marginTop: (width * 0.1) / 8,
  },
  container: {
    backgroundColor: '#eee',
    width: SIZES.width,
    height: SIZES.height,
  },
});

export default styles;
