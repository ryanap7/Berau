import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Gap, HeaderDetail, ListWMP} from '../../components';

const History = ({navigation}) => {
  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <View style={styles.card}>
        <Text style={styles.label}>Pilih WMP</Text>
        <Gap height={11} />
        <ListWMP
          wmp="WMP 3 LT"
          status="Ditolak"
          date="01 April 2021"
          time="08.00"
        />
        <ListWMP
          wmp="WMP 3 LT"
          status="Diproses"
          date="01 April 2021"
          time="08.00"
        />
        <ListWMP
          wmp="WMP 4 LT"
          status="Diterima"
          date="01 April 2021"
          time="08.00"
        />
      </View>
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
