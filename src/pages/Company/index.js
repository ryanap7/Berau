import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, ListCompany} from '../../components';

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
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    padding: 23,
  },
  stared: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#020202',
  },
});
