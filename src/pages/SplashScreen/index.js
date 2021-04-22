import React, {useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {Background, Line} from '../../assets';
import storage from '../../utils/storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      storage
        .load({
          key: 'token',
          autoSync: true,
          syncInBackground: true,
          syncParams: {
            someFlag: true,
          },
        })
        .then(() => {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        })
        .catch(() => {
          navigation.replace('Login');
        });
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.background}>
        <Text style={styles.text}>ECO</Text>
        <Text style={styles.text2}>FRAME</Text>
        <Text style={styles.text3}>WORK</Text>
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
    width: width,
    height: height,
  },
  line: {
    marginLeft: normalize(30),
    marginTop: normalize(90),
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(36),
    color: '#020202',
    position: 'absolute',
    top: normalize(77),
    left: normalize(60),
    width: normalize(200),
  },
  text2: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(36),
    color: '#020202',
    position: 'absolute',
    top: normalize(123),
    left: normalize(60),
    width: normalize(200),
  },
  text3: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(36),
    color: '#020202',
    position: 'absolute',
    top: normalize(170),
    left: normalize(60),
    width: normalize(200),
  },
  sub: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(15),
    color: '#020202',
    position: 'absolute',
    top: normalize(220),
    left: normalize(60),
    width: '70%',
  },
});
