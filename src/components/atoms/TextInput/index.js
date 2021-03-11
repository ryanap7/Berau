import React from 'react';
import {StyleSheet, TextInput as TextInputRN, View} from 'react-native';

const TextInput = ({placeholder, ...restProps}) => {
  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 30,
    backgroundColor: '#FFFFFF',
    color: '#286090',
  },
});
