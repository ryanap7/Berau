import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getData} from '../../../utils';
import normalize from 'react-native-normalize';

const Header = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [photo, setPhoto] = useState({});
  useEffect(() => {
    getData('userProfile').then((res) => {
      setName(res.user_nama);
      setPosition(res.level.lev_nama);
      setCompany(res.perusahaan.nama);
      setPhoto({uri: res.user_photo});
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
