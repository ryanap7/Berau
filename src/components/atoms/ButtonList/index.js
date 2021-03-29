import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import {Gap} from '..';

const ButtonList = ({text, active, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(active)}>
        <Gap width={5} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonList;

const styles = StyleSheet.create({
  container: (active) => ({
    backgroundColor: active ? '#2D4B9B' : '#A3A3A3',
    width: normalize(90),
    height: normalize(50),
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
