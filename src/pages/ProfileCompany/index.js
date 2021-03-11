import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HeaderDetail} from '../../components';

const ProfileCompany = ({navigation}) => {
  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <View style={styles.container}>
        <Text style={styles.text}>
          PT. Berau Coal memiliki area konsesi 118.400 Ha, terletak di Kab.
          Berau, Kalimantan Utara. Area Konsesi didasarkan pada Surat Kementrain
          Energi dan Sumber Daya Mineral No. 178.K/40.00/DJG/205 (2005-2025).
        </Text>
        <Text style={styles.text}>Site Utama di:</Text>
        <View style={styles.list}>
          <Text style={styles.title}>- Binungan </Text>
          <Text style={styles.amount}> (1954 juta ton batu bara)</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.title}>- Sambarata </Text>
          <Text style={styles.amount}> (213 juta ton batu bara)</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.title}>- Lati </Text>
          <Text style={styles.amount}> (465 juta ton batu bara)</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.title}>- Punan & Gurimbang </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCompany;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 38,
    paddingVertical: 25,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
    textAlign: 'justify',
  },
  list: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#000000',
  },
  amount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
});
