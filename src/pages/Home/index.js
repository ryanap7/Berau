import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Company, IcFavorite, IcSync} from '../../assets';
import {Gap, Header} from '../../components';
import normalize from 'react-native-normalize';

const Home = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.title}>
            <IcFavorite />
            <Gap width={20} />
            <Text style={styles.stared}>Stared Companies</Text>
          </View>
          <View style={styles.list}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('HomeCompany')}>
              <Image source={Company} style={styles.company} />
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={11} />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SyncData')}>
          <IcSync />
          <Gap width={10} />
          <Text style={styles.text}>Synchronization Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: normalize(-20),
    borderTopLeftRadius: normalize(25),
    borderTopRightRadius: normalize(25),
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(25),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: normalize(10),
    padding: normalize(20),
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stared: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(16),
    color: '#020202',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: normalize(10),
  },
  company: {
    width: normalize(130),
    height: normalize(55),
    marginRight: normalize(20),
    marginBottom: normalize(20),
  },
  button: {
    backgroundColor: '#286090',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(10),
    borderRadius: normalize(10),
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});
