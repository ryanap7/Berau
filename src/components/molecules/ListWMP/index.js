import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcMap} from '../../../assets';
import {Gap} from '../../atoms';

const ListWMP = ({wmp, status, date, time, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.wmp}
        onPress={onPress}>
        <IcMap />
        <Gap width={8} />
        <Text style={styles.text}>{wmp}</Text>
        <Gap width={10} />
        {status === 'Diterima' ? (
          <View style={styles.statusAcc}>
            <Text style={styles.textAcc}>{status}</Text>
          </View>
        ) : (
          <View style={styles.status(status)}>
            <Text style={styles.text}>{status}</Text>
          </View>
        )}
      </TouchableOpacity>
      <Gap width={11} />
      <View style={styles.periode}>
        <View style={styles.date}>
          <Text style={styles.text}>{date}</Text>
        </View>
        <Gap height={6} />
        <View style={styles.time}>
          <Text style={styles.text}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default ListWMP;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: normalize(18),
  },
  wmp: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#286090',
    paddingVertical: normalize(10),
    paddingLeft: normalize(15),
    borderRadius: normalize(10),
  },
  periode: {
    flex: 1,
  },
  date: {
    backgroundColor: '#286090',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    backgroundColor: '#286090',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
  textAcc: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
  },
  status: (status) => ({
    backgroundColor: status === 'Ditolak' ? '#FF3A3A' : '#FFC700',
    paddingHorizontal: normalize(17),
    paddingVertical: normalize(3),
    borderRadius: normalize(5),
  }),
  statusAcc: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(17),
    paddingVertical: normalize(3),
    borderRadius: normalize(5),
  },
});
