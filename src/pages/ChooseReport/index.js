import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {HeaderDetail} from '../../components';

const ChooseReport = ({navigation}) => {
  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => navigation.navigate('PelaporanAAT')}>
          <Text style={styles.text}>AAT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => navigation.navigate('PelaporanKimia')}>
          <Text style={styles.text}>Bahan Kimia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => navigation.navigate('Pelaporan')}>
          <Text style={styles.text}>Perbaikan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseReport;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#286090',
    marginVertical: normalize(20),
    marginHorizontal: normalize(10),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
    borderRadius: normalize(11),
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
});
