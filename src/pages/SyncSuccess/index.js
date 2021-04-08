import React from 'react';
import LottieView from 'lottie-react-native';
import {StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Button, Gap} from '../../components';

const SyncSuccess = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Lottie/Success.json')}
        autoPlay
        loop
      />
      <Gap height={400} />
      <Text style={styles.text}>Sinkronisasi Berhasil</Text>
      <Gap height={11} />
      <Button
        text="Back to Home"
        onPress={() =>
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
        }
      />
    </View>
  );
};

export default SyncSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(18),
    color: '#000000',
  },
});
