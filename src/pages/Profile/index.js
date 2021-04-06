import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcLogout} from '../../assets';
import {Button, Gap, Header} from '../../components';
import storage from '../../utils/storage';

const Profile = ({navigation}) => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [start, setStart] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    storage
      .load({
        key: 'profile',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((res) => {
        setName(res.user_nama);
        setBirthday(res.user_tanggal_lahir);
        setAddress(res.user_alamat);
        setPhone(res.user_phone);
        setCompany(res.perusahaan.nama);
        setStart(res.mulai_bekerja);
        setPosition(res.jabatan.nama);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  // Logout
  const LogOut = () => {
    storage.remove({
      key: 'profile',
    });
    storage.remove({
      key: 'token',
    });
    storage.remove({
      key: 'refreshToken',
    });
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };
  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.label}>Nama</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <Text style={styles.value}>{birthday}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Alamat</Text>
            <Text style={styles.value}>{address}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>No. Hp / Telpon</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Asal Perusahaan</Text>
            <Text style={styles.value}>{company}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Bekerja Tahun</Text>
            <Text style={styles.value}>{start}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Jabatan</Text>
            <Text style={styles.value}>{position}</Text>
          </View>
        </View>
        <Gap height={20} />
        <Button text="LOGOUT" onPress={LogOut} icon={<IcLogout />} />
      </View>
    </View>
  );
};

export default Profile;

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
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(25),
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
    elevation: normalize(10),
    padding: normalize(20),
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
    fontSize: normalize(14),
    color: '#020202',
  },
});
