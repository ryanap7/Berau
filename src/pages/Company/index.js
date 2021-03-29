import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, ListCompany} from '../../components';
import normalize from 'react-native-normalize';

const Company = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.container}>
        <View style={styles.card}>
          <ListCompany
            title="PT Berau Coal"
            onPress={() => navigation.navigate('HomeCompany')}
          />
        </View>
      </View>
    </View>
  );
};

export default Company;

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
    paddingVertical: normalize(25),
    paddingHorizontal: normalize(15),
  },
  card: {
    flex: 1,
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
    padding: normalize(23),
  },
  stared: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(16),
    color: '#020202',
  },
});
