import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getData} from '../../../utils';

const ChemicalSummary = () => {
  const [wmp, setWMP] = useState('');
  const [date, setDate] = useState('');
  const [periodical, setPeriodical] = useState('');
  const [timeHour, setTimeHour] = useState('');
  const [timeMinute, setTimeMinute] = useState('');
  const [chemical, setChemical] = useState('Kapur');
  const [purity, setPurity] = useState('Cerah');
  const [before, setBefore] = useState('');
  const [BeforeUnit, setBeforeUnit] = useState('L');
  const [current, setCurrent] = useState('');
  const [CurrentUnit, setCurrentUnit] = useState('L');
  useEffect(() => {
    getData('ChemicalDescription').then((res) => {
      setDate(res.date_input);
      setPeriodical(res.periodical_input);
      setTimeHour(res.time_input_hour);
      setTimeMinute(res.time_input_minute);
      setChemical(res.chemical);
      setPurity(res.purity);
    });
    getData('ChemicalData').then((res) => {
      setBefore(res.before);
      setBeforeUnit(res.before_unit);
      setCurrent(res.current);
      setCurrentUnit(res.current_unit);
    });
    getData('wmp').then((res) => {
      setWMP(res);
    });
  }, []);
  return (
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
          {timeHour}.{timeMinute}
        </Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.label}>Chemical</Text>
        <Text style={styles.value}>{chemical}</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.label}>% Purity</Text>
        <Text style={styles.value}>{purity}</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.label}>Stock Shift Sebelumnya</Text>
        <Text style={styles.value}>
          {before} {BeforeUnit}
        </Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.label}>Stock Saat Ini</Text>
        <Text style={styles.value}>
          {current} {CurrentUnit}
        </Text>
      </View>
    </View>
  );
};

export default ChemicalSummary;

const styles = StyleSheet.create({
  card: {
    width: '90%',
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
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
