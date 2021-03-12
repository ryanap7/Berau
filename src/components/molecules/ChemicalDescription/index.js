import React, {useEffect, useState} from 'react';
import Moment from 'moment';
import 'moment/locale/id';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {storeData, useForm} from '../../../utils';
import {Gap, Select, TextInput} from '../../atoms';

const ChemicalDescription = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useForm({
    date_input: new Date(),
    periodical_input: '',
    time_input_hour: '',
    time_input_minute: '',
    chemical: 'Kapur',
    purity: 'Cerah',
  });
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.date_input;
    console.log(currentDate);
    setForm('date_input', currentDate);
    setShow(false);
  };

  storeData('ChemicalDescription', form);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Gap height={10} />
          <Text style={styles.label}>Date Input</Text>
        </View>
        <TouchableOpacity style={styles.calendar} onPress={() => setShow(true)}>
          <Text>{Moment(form.date_input).format('DD-MM-YYYY')}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={form.date_input}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
      </View>
      <Gap height={20} />
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Periodical Input</Text>
        </View>
        <View style={styles.containerInput}>
          <Select
            value={form.periodical_input}
            type="Periodical"
            onSelectChange={(value) => {
              setForm('periodical_input', value);
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Time Input</Text>
        </View>
        <View style={styles.containerInput}>
          <View style={styles.containerTimeInput}>
            <View style={styles.leftContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="hh"
                value={form.time_input_hour}
                onChangeText={(value) => setForm('time_input_hour', value)}
              />
            </View>
            <Gap width={16} />
            <View style={styles.rightContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="mm"
                value={form.time_input_minute}
                onChangeText={(value) => setForm('time_input_minute', value)}
              />
            </View>
          </View>
        </View>
      </View>
      <Gap height={20} />
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Chemical</Text>
        </View>
        <View style={styles.containerInput}>
          <Select
            value={form.chemical}
            type="Chemical"
            onSelectChange={(value) => setForm('chemical', value)}
          />
        </View>
      </View>
      <Gap height={10} />
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>% Purity</Text>
        </View>
        <View style={styles.containerInput}>
          <Select
            value={form.purity}
            type="Weather"
            onSelectChange={(value) => setForm('purity', value)}
          />
        </View>
      </View>
    </View>
  );
};

export default ChemicalDescription;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 45,
    justifyContent: 'center',
  },
  containerLabel: {
    flex: 2,
    justifyContent: 'center',
  },
  containerInput: {
    flex: 3,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  datePicker: {
    width: 200,
    marginLeft: 10,
  },
  containerTimeInput: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: -18,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  calendar: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingLeft: 11,
    marginLeft: 14,
    marginRight: -18,
  },
});
