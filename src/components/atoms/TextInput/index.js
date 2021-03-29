import React from 'react';
import {StyleSheet, TextInput as TextInputRN, View} from 'react-native';
import normalize from 'react-native-normalize';

const TextInput = ({placeholder, ...restProps}) => {
  return (
    <View>
      <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    padding: normalize(10),
    paddingLeft: normalize(30),
    backgroundColor: '#FFFFFF',
    color: '#286090',
  },
});
