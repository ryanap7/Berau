import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getData} from '../../../utils';

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
    paddingVertical: 35,
    paddingHorizontal: 25,
    backgroundColor: '#286090',
    height: '25%',
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FCFCFF',
    textTransform: 'uppercase',
  },
  subTitle: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#FCFCFF',
    textTransform: 'uppercase',
  },
  company: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: '#FCFCFF',
    textTransform: 'uppercase',
  },
});
