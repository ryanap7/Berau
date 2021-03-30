import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import {IcBack} from '../../../assets';

const HeaderDetail = ({company, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.container}>
      <IcBack />
      <Text style={styles.text}>{company}</Text>
    </TouchableOpacity>
  );
};

export default HeaderDetail;

const styles = StyleSheet.create({
  container: {
    paddingVertical: normalize(24),
    paddingHorizontal: normalize(20),
    backgroundColor: '#286090',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#FFFFFF',
    marginLeft: normalize(10),
  },
});
