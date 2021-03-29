import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';

const ListCompany = ({title, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.list} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ListCompany;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    paddingVertical: normalize(17),
    paddingHorizontal: normalize(30),
    backgroundColor: '#286090',
    borderRadius: normalize(10),
    marginBottom: normalize(16),
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
});
