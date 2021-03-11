import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IcBack} from '../../../assets';

const HeaderDetail = ({company, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
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
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#286090',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 10,
  },
});
