import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcDownload, User} from '../../assets';
import {Button, Gap, HeaderDetail} from '../../components';

const DataPetugas = ({navigation}) => {
  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={11} />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.image}>
            <Image source={User} style={styles.profile} />
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Nama</Text>
            <Text style={styles.value}>Tono</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Umur</Text>
            <Text style={styles.value}>25 Tahun</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Tanggal Bergabung</Text>
            <Text style={styles.value}>1 April 2020</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>NPP</Text>
            <Text style={styles.value}>12345</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>No. Hp</Text>
            <Text style={styles.value}>0812267xxxxx</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Alamat</Text>
            <Text style={styles.value}>Jl. xxx</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Area Kerja</Text>
            <Text style={styles.value}>xxx</Text>
          </View>
        </View>
        <View style={styles.download}>
          <Button icon={<IcDownload />} text="DOWNLOAD" />
        </View>
      </View>
    </View>
  );
};

export default DataPetugas;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: normalize(20),
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    padding: normalize(20),
    marginHorizontal: normalize(15),
  },
  image: {
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  profile: {
    width: normalize(100),
    height: normalize(100),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(14),
    color: '#020202',
  },
  value: {
    fontFamily: 'Poppins-Light',
    fontSize: normalize(12),
    color: '#020202',
  },
  download: {
    paddingHorizontal: normalize(11),
  },
});
