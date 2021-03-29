import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcPersonalData} from '../../assets';
import {Button, Gap, HeaderDetail, Select, TextInput} from '../../components';

const DetailPetugas = ({navigation}) => {
  const [penugasan, setPenugasan] = useState('Area Tambang LMO');
  const [wmp, setWmp] = useState('WMP 1');
  const [jabatan, setJabatan] = useState('Data Pemakaian Kapur');

  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={11} />
      <View style={styles.area}>
        <Select
          value={penugasan}
          type="Penugasan"
          onSelectChange={(value) => setPenugasan(value)}
        />
      </View>
      <View style={styles.containerMenu}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menu}
          onPress={() => navigation.navigate('DataPetugas')}>
          <IcPersonalData />
          <Gap height={2} />
          <Text style={styles.menuText}>Data</Text>
          <Text style={styles.menuText}>Petugas</Text>
        </TouchableOpacity>
        <View style={styles.wmp}>
          <Select
            value={wmp}
            type="WMP"
            onSelectChange={(value) => setWmp(value)}
          />
          <Select
            value={jabatan}
            type="Jabatan"
            onSelectChange={(value) => setJabatan(value)}
          />
        </View>
      </View>
      {/* Content */}
      <Gap height={30} />
      <View style={styles.container}>
        <TextInput placeholder="Masukkan Nama Petugas" style={styles.input} />
        <Gap width={20} />
        <Button text="Search" />
      </View>
      <View style={styles.result}>
        <Text style={styles.employees}>Toni – Operator WMP 4 LMO</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('DetailPetugas')}>
          <Text style={styles.text}>Show</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailPetugas;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: normalize(20),
  },
  containerMenu: {
    flexDirection: 'row',
    paddingLeft: normalize(15),
  },
  wmp: {
    flex: 1,
    marginHorizontal: normalize(15),
  },
  menu: {
    alignItems: 'center',
    marginTop: normalize(16),
  },
  area: {
    marginHorizontal: normalize(15),
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#286090',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(25),
  },
  input: {
    width: normalize(246),
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(25),
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalize(20),
    marginHorizontal: normalize(40),
  },
  employees: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
  },
  button: {
    backgroundColor: '#286090',
    paddingHorizontal: normalize(11),
    paddingVertical: normalize(6),
    borderRadius: normalize(10),
    marginLeft: normalize(5),
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(10),
    color: '#FFFFFF',
  },
});
