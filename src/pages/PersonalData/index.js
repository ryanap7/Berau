import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcAddAttendance, IcDate, IcEdit, IcTrash} from '../../assets';
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
        <Button
          text="Add"
          icon={<IcAddAttendance />}
          onPress={() => navigation.navigate('AddAttendance')}
        />
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View style={styles.header}>
                <Text style={styles.labelName}>Nama</Text>
                <Text style={styles.labelBadge}>Kehadiran</Text>
                <Text style={styles.labelStatus}>Status</Text>
                <Text style={styles.labelWmp}>WMP</Text>
                <Text style={styles.labelAction}>Action</Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.valueName}>Toto</Text>
                <View style={styles.containerBadge}>
                  <View style={styles.badge}>
                    <Text style={styles.valueBadge}>Tidak Hadir</Text>
                  </View>
                </View>
                <Text style={styles.valueStatus}>Dedicated</Text>
                <Text style={styles.valueWmp}>1 LT</Text>
                <View style={styles.valueAction}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('EditAttendance')}>
                    <IcEdit />
                  </TouchableOpacity>
                  <Gap width={10} />
                  <TouchableOpacity>
                    <IcTrash />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
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
  body: {
    flexDirection: 'row',
    paddingHorizontal: 21,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  labelName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    width: 100,
    textAlign: 'center',
    marginRight: 4,
  },
  labelBadge: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    width: 100,
    textAlign: 'center',
    marginRight: 4,
  },
  labelStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    width: 100,
    textAlign: 'center',
    marginRight: 4,
  },
  labelWmp: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    width: 100,
    textAlign: 'center',
    marginRight: 4,
  },
  labelAction: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    width: 100,
    textAlign: 'center',
    marginRight: 4,
  },
  containerBadge: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -3,
  },
  badge: {
    width: 70,
    backgroundColor: '#A3A3A3',
    borderRadius: 5,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
    width: 100,
    marginRight: 4,
    textAlign: 'center',
  },
  valueBadge: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#FFFFFF',
  },
  valueStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
    width: 100,
    marginRight: 4,
    textAlign: 'center',
  },
  valueWmp: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
    width: 100,
    marginRight: 4,
    textAlign: 'center',
  },
  valueAction: {
    flexDirection: 'row',
    width: 100,
    marginRight: 4,
    justifyContent: 'center',
  },
});
