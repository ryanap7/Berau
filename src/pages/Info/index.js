import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Header, InfoList} from '../../components';
import storage from '../../utils/storage';

const Info = ({navigation}) => {
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
        Axios.get(`${API_HOST.url}/notifikasi`, {
          headers: {
            Authorization: `Bearer ${ret}`,
          },
        }).then((res) => {
          setData(res.data.notif);
        });
      });
  }, []);
  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.container}>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item) => {
              console.log(item);
              return (
                <InfoList
                  text={item.keterangan}
                  active
                  onPress={() => navigation.navigate('InfoDetail', item)}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: normalize(-20),
    borderTopLeftRadius: normalize(25),
    borderTopRightRadius: normalize(25),
    paddingVertical: normalize(25),
    paddingHorizontal: normalize(15),
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: normalize(10),
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(20),
    height: '85%',
  },
  addButton: {
    flex: 1,
    paddingHorizontal: 7,
  },
});
