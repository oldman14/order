import {StyleSheet} from 'react-native';
import {SIZES} from '../../constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    width: SIZES.width - 20,
    height: 100,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  section_image: {
    flex: 1.5,
    width: 40,
    height: 40,
    margin: 20,
    alignSelf: 'center',
  },
  section_midbox: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 8,
  },
  section_tableName: {
    fontSize: SIZES.h2,
  },
  section_time: {
    flex: 2,
    alignSelf: 'center',
    fontSize: SIZES.body2,
  },
  section_quantity: {
    fontSize: SIZES.body3,
  },
  section_dishName: {
    fontSize: SIZES.body3,
  },
  orderTitle: {
    fontSize: SIZES.body2,
    color: '#fff',
  },
  orderText: {
    fontSize: SIZES.body3,
    color: '#fff',
  },
  cart_container: {
    position: 'absolute',
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: '#ddd',
  },
  cart_cancel: {
    width: 18,
    height: 18,
    marginHorizontal: 8,
    alignSelf: 'center',
    right: 0,
  },
  cart_viewCancel: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cart_title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  cart_section1: {
    width: SIZES.width,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  cart_titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  cart_titleListOrder: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  cart_addTitle: {
    padding: 5,
    backgroundColor: '#FFA54F',
    borderRadius: 5,
    color: '#fff',
  },
  cart_section1_cartItem: {
    flex: 8,
    flexDirection: 'column',
  },
  cart_acceptContainer: {
    flexDirection: 'row',
    width: SIZES.width,
    height: 80,
    backgroundColor: '#f90',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 3,
  },
  cart_btnPay: {
    flex: 2.5,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#f90',
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
  cart_totalMoney: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 10,
    paddingBottom: 10,
  },
  cart_totalMoney_title: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  cart_delete: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
});
export default styles;
