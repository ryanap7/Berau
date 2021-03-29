import React from 'react';
import {StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';

const Gap = ({width = 0, height = 0}) => {
  return <View style={styles.gap(width, height)} />;
};

const styles = StyleSheet.create({
  gap: (width, height) => ({
    width: normalize(width),
    height: normalize(height),
  }),
});

export default Gap;
