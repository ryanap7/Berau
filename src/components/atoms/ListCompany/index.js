import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

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
    paddingVertical: 17,
    paddingHorizontal: 30,
    backgroundColor: '#286090',
    borderRadius: 10,
    marginBottom: 16,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
