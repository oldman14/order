import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SIZES} from '../../constants';
import statisticalApi from '../../api/statisticalApi';
import formatCurrency from '../component/formatCurrency';
const Setting = ({navigation}) => {
  const [totalDay, setTotalDay] = useState(0);
  const [totalWeek, setTotalWeek] = useState(0);
  const handleWeek = () => {
    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor(
      (currentdate - oneJan) / (24 * 60 * 60 * 1000),
    );
    var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    return result;
  };

  useEffect(() => {
    const getStatis = async () => {
      try {
        const date = new Date()
          .toISOString()
          .replace('-', '/')
          .split('T')[0]
          .replace('-', '/');
        const data = await statisticalApi.getAll({onDate: date});
        console.log(data);
        setTotalDay(data);
      } catch (error) {
        console.log('Get date faile', error);
      }
    };
    getStatis();
    const getWeek = async () => {
      try {
        const date = new Date();
        const year = date.getFullYear();
        const week = handleWeek();
        const data = await statisticalApi.getWeek(
          (onDate = {
            onDate: date,
            week: week,
            year: year,
          }),
        );
        setTotalWeek(data);
      } catch (error) {
        console.log('Get date faile', error);
      }
    };
    getWeek();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Doanh Thu</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.boxDT}>
            <Image
              style={styles.box_image}
              source={require('../../assets/images/icons8-present-40.png')}
            />
            <Text style={styles.box_title}>Hôm nay</Text>
            <Text style={styles.box_total}>{formatCurrency(totalDay)}</Text>
          </View>
          <View style={styles.boxDT}>
            <Image
              style={styles.box_image}
              source={require('../../assets/images/icons8-last-24-hours-90.png')}
            />
            <Text style={styles.box_title}>Tuần này</Text>
            <Text style={styles.box_total}>{formatCurrency(totalWeek)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Cài Đặt</Text>
        <View style={styles.setting}>
          <View style={styles.setting_box}>
            <Image
              style={styles.setting_image}
              source={require('../../assets/images/icons8-user-50.png')}
            />
            <Text style={styles.setting_title}>Cập nhật thông tin</Text>
            <Image
              style={styles.setting_arrow}
              source={require('../../assets/images/icons8-chevron-right-60.png')}
            />
          </View>
        </View>
        <View style={styles.setting}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <View style={styles.setting_box}>
              <Image
                style={styles.setting_image}
                source={require('../../assets/images/icons8-menu-128.png')}
              />
              <Text style={styles.setting_title}>Chỉnh sửa thực đơn</Text>
              <Image
                style={styles.setting_arrow}
                source={require('../../assets/images/icons8-chevron-right-60.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <TouchableOpacity onPress={() => navigation.navigate('Chart')}>
            <View style={styles.setting_box}>
              <Image
                style={styles.setting_image}
                source={require('../../assets/images/icons8-chart-50.png')}
              />
              <Text style={styles.setting_title}>Thống kê</Text>
              <Image
                style={styles.setting_arrow}
                source={require('../../assets/images/icons8-chevron-right-60.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <TouchableOpacity onPress={() => navigation.navigate('Table')}>
            <View style={styles.setting_box}>
              <Image
                style={styles.setting_image}
                source={require('../../assets/images/icons8-menu-128.png')}
              />
              <Text style={styles.setting_title}>Chỉnh sửa bàn</Text>
              <Image
                style={styles.setting_arrow}
                source={require('../../assets/images/icons8-chevron-right-60.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <View style={styles.setting_box}>
            <Image
              style={styles.setting_image}
              source={require('../../assets/images/icons8-settings-50.png')}
            />
            <Text style={styles.setting_title}>Cài đặt</Text>
            <Image
              style={styles.setting_arrow}
              source={require('../../assets/images/icons8-chevron-right-60.png')}
            />
          </View>
        </View>
        <View style={styles.setting}>
          <View style={styles.setting_box}>
            <Image
              style={styles.setting_image}
              source={require('../../assets/images/icons8-logout-rounded-left-50.png')}
            />
            <Text style={styles.setting_title}>Đăng xuất</Text>
            <Image
              style={styles.setting_arrow}
              source={require('../../assets/images/icons8-chevron-right-60.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: '#eee',
  },
  boxDT: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZES.width / 2 - 20,
    height: 120,
    backgroundColor: '#fff',
    marginRight: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  section: {
    margin: 12,
  },
  box_image: {
    width: 30,
    height: 30,
  },
  box_title: {
    fontSize: SIZES.body3,
    marginVertical: 5,
  },
  box_total: {
    fontSize: SIZES.body2,
  },
  setting: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
  },
  setting_box: {
    flexDirection: 'row',
    margin: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  setting_image: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  setting_arrow: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    alignContent: 'flex-end',
  },
  setting_title: {
    marginLeft: 5,
    width: SIZES.width - 110,
    fontSize: SIZES.body2,
    alignSelf: 'center',
  },
});

export default Setting;
