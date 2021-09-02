import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import statisticalApi from '../../../api/statisticalApi';
import {SIZES} from '../../../constants';
import {LISTCOLORS} from '../../../constants/theme';
import {nextDay, formatDate, nextDay1} from '../../component/formatDate';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Progress from 'react-native-progress';
import formatCurrency from '../../component/formatCurrency';

const Chart = () => {
  const [monthYear, setmonthYear] = useState();
  const [day, setday] = useState(new Date());
  const [dataOrder, setdataOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const formatOrder = data => {
    let listOrder = [];
    data.forEach(e => {
      const index = data.findIndex(item => item.product._id === e.product._id);
      const name = e.product.productName;
      const price = e.product.price;
      const quantity = e.quatity;
      const total = price * e.quantity;
      const dataChart = {
        name: name,
        population: total,
        color: LISTCOLORS[index],
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      };
      listOrder.push(dataChart);
    });
    const totalPrice = listOrder.reduce((pre, cur) => {
      return pre + cur.population;
    }, 0);
    setTotalPrice(totalPrice);
    setdataOrder(listOrder);
    return listOrder;
  };

  useEffect(() => {
    console.log('today', date);
    const getOrderOneDay = async () => {
      try {
        // const today = formatDate(day);
        const data = await statisticalApi.getDay({
          today: formatDate(date),
          nextDay: nextDay(),
        });
        console.log('data Order', data);
        formatOrder(data);
      } catch (error) {
        console.log('Get data order one day failed', error);
      }
    };
    getOrderOneDay();
  }, [date]);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const renderListDish = ({item}) => {
    console.log('object', totalPrice);
    return (
      <View style={styles.flatlist_section}>
        <View style={styles.flatlist_titlePrice}>
          <Text style={styles.flatlist_title}>{item.name}</Text>
          <Text style={styles.flatlist_title}>
            {formatCurrency(item.population)}
          </Text>
        </View>
        <Progress.Bar
          progress={item.population / totalPrice}
          width={SIZES.width - 20}
          height={20}
          color={item.color}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#ddd'}}>
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View style={styles.date_section}>
          <Text style={styles.date_text}>{formatDate(day)}</Text>
          <View style={styles.date_viewImage}>
            <Image
              style={styles.date_image}
              source={require('../../../assets/images/icons8-sort-down-50.png')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{backgroundColor: '#fff'}}>
        <PieChart
          data={dataOrder}
          width={SIZES.width}
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 0]}
          absolute
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {dataOrder && (
        <FlatList
          data={dataOrder}
          renderItem={renderListDish}
          keyExtractor={item => item.name}
          contentContainerStyle={{backgroundColor: '#fff'}}
        />
      )}
    </View>
  );
};

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
export default Chart;
