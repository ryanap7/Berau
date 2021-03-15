import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcAddAttendance, IcDate} from '../../assets';
import {Button, Gap, HeaderDetail} from '../../components';
import {useForm} from '../../utils';

const PersonalData = ({navigation}) => {
  const [form, setForm] = useForm({
    date_input: new Date(),
  });

  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.date_input;
    setForm('date_input', currentDate);
    setShow(false);
  };
  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={11} />
      <View style={styles.button}>
        <Button text="Add" icon={<IcAddAttendance />} />
      </View>
      <View style={styles.container}>
        <Text style={styles.labelDate}>Date Attendance</Text>
        <TouchableOpacity style={styles.calendar} onPress={() => setShow(true)}>
          <IcDate />
          <Text style={styles.placeholder}>
            {Moment(form.date_input).format('DD-MM-YYYY')}
          </Text>
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
      <View style={styles.list}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.labelHeader}>Nama</Text>
            <Text style={styles.labelHeader}>Kehadiran</Text>
            <Text style={styles.labelHeader}>Status</Text>
            <Text style={styles.labelHeader}>WMP</Text>
            <Text style={styles.labelHeader}>Action</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PersonalData;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginHorizontal: 11,
  },
  labelDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  placeholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#286090',
    marginHorizontal: 9,
  },
  button: {
    margin: 11,
    alignItems: 'flex-end',
  },
  list: {
    flex: 1,
    marginHorizontal: 11,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    padding: 20,
    marginTop: 11,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#A3A3A3',
    paddingHorizontal: 21,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  labelHeader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
});
