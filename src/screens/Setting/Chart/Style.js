import {StyleSheet} from 'react-native';
import {SIZES} from '../../../constants';
const styles = StyleSheet.create({
  date_section: {
    backgroundColor: '#fff',
    width: SIZES.width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f90',
    flexDirection: 'row',
  },
  date_text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: SIZES.body3,
  },
  date_image: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  flatlist_section: {
    width: SIZES.width,
    marginVertical: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  flatlist_title: {
    fontSize: SIZES.body3,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  flatlist_titlePrice: {
    width: SIZES.width,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default styles;
