import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcAddInfo} from '../../assets';
import {Button, Gap, Header, InfoList} from '../../components';

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
            <InfoList text="Supply Listrik di WMP 27 mati" />
          </ScrollView>
        </View>
        <Gap height={20} />
        <TouchableOpacity activeOpacity={0.7} style={styles.addButton}>
          <Button text="Add" icon={<IcAddInfo />} />
        </TouchableOpacity>
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
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },
  card: {
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
    paddingHorizontal: 30,
    paddingVertical: 20,
    height: '90%',
  },
  addButton: {
    flex: 1,
    paddingHorizontal: 7,
  },
});
