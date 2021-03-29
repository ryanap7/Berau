import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import {Gap} from '..';

const Button = ({text, icon, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        {icon}
        <Gap width={5} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D4B9B',
    padding: normalize(12),
    borderRadius: normalize(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: normalize(12),
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
