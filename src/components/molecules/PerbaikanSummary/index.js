import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getData} from '../../../utils';

const PerbaikanSummary = () => {
  const [wmp, setWMP] = useState('');
  const [date, setDate] = useState('');
  const [periodical, setPeriodical] = useState('');
  const [timeHour, setTimeHour] = useState('');
  const [timeMinute, setTimeMinute] = useState('');
  const [perbaikan, setPerbaikan] = useState('Pengerukan');
  const [note, setNote] = useState('');
  useEffect(() => {
    getData('PerbaikanDescription').then((res) => {
      setDate(res.date_input);
      setPeriodical(res.periodical_input);
      setTimeHour(res.time_input_hour);
      setTimeMinute(res.time_input_minute);
      setPerbaikan(res.perbaikan);
    });
    getData('PerbaikanData').then((res) => {
      setNote(res.note);
    });
    getData('wmp').then((res) => {
      setWMP(res);
    });
  }, []);
  return (
    <View style={styles.content}>
      <View style={styles.card}>
        <View style={styles.summary}>
          <Text style={styles.label}>WMP</Text>
          <Text style={styles.value}>{wmp}</Text>
        </View>
        <View style={styles.summary}>
          <Text style={styles.label}>Date Input</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View style={styles.summary}>
          <Text style={styles.label}>Periodical Input</Text>
          <Text style={styles.value}>{periodical}</Text>
        </View>
        <View style={styles.summary}>
          <Text style={styles.label}>Time Input</Text>
          <Text style={styles.value}>
            {timeHour} {timeMinute}
          </Text>
        </View>
        <View style={styles.summary}>
          <Text style={styles.label}>Jenis Perbaikan</Text>
          <Text style={styles.value}>{perbaikan}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.summary}>
          <Text style={styles.label}>Kegiatan Perbaikan</Text>
          <Text style={styles.value}>{note}</Text>
        </View>
      </View>
    </View>
  );
};

export default PerbaikanSummary;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  card: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 5,
    padding: 20,
    marginBottom: 13,
    marginHorizontal: 45,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#020202',
  },
  value: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#020202',
  },
});
