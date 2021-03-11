import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
    width: 90,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
