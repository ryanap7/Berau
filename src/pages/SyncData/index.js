import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcMap} from '../../assets';
import {Gap, HeaderDetail} from '../../components';
import {getData} from '../../utils';

const SyncData = ({navigation}) => {
  const [wmp, setWmp] = useState([]);

  useEffect(() => {
    getData('tambang').then((res) => {
      setWmp(res.wmp);
    });
  }, []);

  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={22} />
      <View style={styles.card}>
        <Text style={styles.title}>Pilih WMP</Text>
        <Gap height={11} />
        {wmp.map((res) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.list}
              onPress={() => navigation.navigate('SyncDetail', res)}>
              <IcMap />
              <Gap width={9} />
              <Text style={styles.text}>{res.nama}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SyncData;

const styles = StyleSheet.create({
  page: {
    flex: 1,
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
    paddingHorizontal: normalize(18),
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#000000',
  },
  list: {
    backgroundColor: '#286090',
    flexDirection: 'row',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(22),
    borderRadius: normalize(10),
    marginBottom: normalize(22),
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
});
