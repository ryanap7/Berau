import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Background, Line} from '../../assets';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('userProfile').then((res) => {
        if (res) {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        } else {
          navigation.replace('Login');
        }
      });
    }, 2000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.background}>
        <Text style={styles.text}>ECO FRAME WORK</Text>
        <Text style={styles.sub}>
          Wastewater and Water Treatment Project’s Monitoring System
        </Text>
        <Line style={styles.line} />
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  line: {
    marginLeft: 30,
    marginTop: 90,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 35,
    color: '#020202',
    position: 'absolute',
    top: 80,
    left: 60,
    width: 200,
  },
  sub: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#020202',
    position: 'absolute',
    top: 230,
    left: 60,
    width: '70%',
  },
});
