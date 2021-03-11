import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack, IcBackHome} from '../../../assets';
import {Gap} from '../../atoms';

const HeaderCompany = ({
  title,
  address,
  phone,
  profile,
  onPress,
  back,
  home,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Image source={profile} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.detail}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{address}</Text>
          <Text style={styles.company}>{phone}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderCompany;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#286090',
  },
  button: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  header: {
    flexDirection: 'row',
  },
  image: {
    marginTop: 25,
    width: 135,
    height: 55,
  },
  detail: {
    width: 252,
    marginLeft: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  company: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
});
