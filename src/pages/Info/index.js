import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Header, InfoList} from '../../components';

const Info = () => {
  return (
    <View style={styles.page}>
      <Header
        title="TOTO ISWANTO"
        subTitle="PENGAWAS LINGKUNGAN"
        company="SUCOFINDO (PERSERO)"
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <InfoList
              text="Early warning dari sensor pH WMP 1 PT. Berau Coal"
              active
            />
            <InfoList text="Stock Kapur di WMP 4 telah Habis" />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Info;

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
    paddingHorizontal: normalize(30),
    paddingVertical: normalize(20),
    height: '85%',
  },
  addButton: {
    flex: 1,
    paddingHorizontal: 7,
  },
});
