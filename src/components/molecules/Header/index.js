import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import storage from '../../../utils/storage';

const Header = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [photo, setPhoto] = useState({});
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
        setPosition(res.level.lev_nama);
        setCompany(res.perusahaan.nama);
        setPhoto({uri: res.user_photo});
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.profile} />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subTitle}>{position}</Text>
        <Text style={styles.company}>{company}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: normalize(35),
    paddingHorizontal: normalize(25),
    backgroundColor: '#286090',
    height: normalize(170),
  },
  profile: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    marginRight: normalize(10),
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(18),
    color: '#FCFCFF',
    textTransform: 'uppercase',
  },
  subTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: normalize(14),
    color: '#FCFCFF',
    textTransform: 'uppercase',
  },
  company: {
    fontFamily: 'Poppins-Light',
    fontSize: normalize(12),
    color: '#FCFCFF',
    textTransform: 'uppercase',
  },
});
