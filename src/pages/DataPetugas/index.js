import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
      <Select
        value={penugasan}
        type="Penugasan"
        onSelectChange={(value) => setPenugasan(value)}
      />
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
    paddingBottom: 20,
  },
  containerMenu: {
    flexDirection: 'row',
    paddingLeft: 11,
  },
  wmp: {
    flex: 1,
  },
  menu: {
    alignItems: 'center',
    marginTop: 16,
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#286090',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 40,
  },
  employees: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  button: {
    backgroundColor: '#286090',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 5,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#FFFFFF',
  },
});
