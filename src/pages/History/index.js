import Axios from 'axios';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Gap, HeaderDetail, ListWMP} from '../../components';
import storage from '../../utils/storage';
import LottieView from 'lottie-react-native';

const History = ({navigation}) => {
  const [data, setData] = useState([]);
  const API_HOST = {
    url: 'https://berau.mogasacloth.com/api/v1',
  };
  useEffect(() => {
    storage
      .load({
        key: 'token',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((ret) => {
        Axios.get(`${API_HOST.url}/history`, {
          headers: {
            Authorization: `Bearer ${ret}`,
          },
        }).then((res) => {
          setData(res.data.data);
        });
      })
      .catch((err) => {
        console.warn(err.response);
      });
  }, []);
  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.navigate('Penugasan')}
        company="PT. Berau Coal"
      />
      {data.length < 0 ? (
        <LottieView
          source={require('../../assets/Lottie/Empty.json')}
          autoPlay
          loop
        />
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Pilih WMP</Text>
          <ScrollView>
            <Gap height={11} />
            {data.map((item) => {
              console.log(item);
              const date = Moment(item.created_at).format('DD MMMM YYYY');
              const time = Moment(item.created_at).format('H:mm');

              return (
                <ListWMP
                  key={item.id}
                  wmp={item.wmp.nama}
                  status={item.status}
                  date={date}
                  time={time}
                  onPress={() => navigation.navigate('HistoryDetail', item)}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    marginVertical: normalize(11),
    marginHorizontal: normalize(15),
    paddingVertical: normalize(22),
    paddingHorizontal: normalize(11),
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
  },
});
