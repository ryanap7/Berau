import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import Axios from 'axios';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import {Gap, HeaderDetail} from '../../components';
import {setLoading} from '../../redux/action';
import {useForm} from '../../utils';
import storage from '../../utils/storage';

const RekapAttendance = ({navigation}) => {
  const [form, setForm] = useForm({
    date_input: new Date(),
    kehadiran: 'Semua',
  });

  const [token, setToken] = useState('');
  const [attendance, setAttendance] = useState([]);

  const dispatch = useDispatch();

  const date = Moment(form.date_input).format('YYYY-MM-DD');

  const API_HOST = {
    url: 'https://berau.mogasacloth.com/api/v1',
  };

  useEffect(() => {
    storage
      .load({
        key: 'token',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((ret) => {
        setToken(ret);
        Axios.get(
          `${API_HOST.url}/absen/filter?kehadiran=${form.kehadiran}&tanggal=${date}`,
          {
            headers: {
              Authorization: `Bearer ${ret}`,
            },
          },
        ).then((res) => {
          setAttendance(res.data.data);
          dispatch(setLoading(false));
        });
      })
      .catch((err) => {
        console.warn('+++==== ', err.response);
      });
  }, []);

  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || form.date_input;
    setForm('date_input', currentDate);
    setShow(false);
  };

  const onFilter = () => {
    dispatch(setLoading(true));
    Axios.get(
      `${API_HOST.url}/absen/filter?kehadiran=${form.kehadiran}&tanggal=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => {
      dispatch(setLoading(false));
      setAttendance(res.data.data);
    });
  };

  return (
    <View style={styles.page}>
      <HeaderDetail
        company="PT. Berau Coal"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.filterContainer}>
        <View style={styles.date}>
          <Text style={styles.label}>Tanggal Kehadiran</Text>
          <Gap height={5} />
          <TouchableOpacity
            style={styles.calendar}
            onPress={() => setShow(true)}>
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
        <Gap width={11} />
        <View style={styles.attendance}>
          <Text style={styles.label}>Kehadiran</Text>
          <Gap height={5} />
          <View style={styles.selectContainer}>
            <Picker
              selectedValue={form.kehadiran}
              style={styles.select}
              onValueChange={(value) => setForm('kehadiran', value)}>
              <Picker.Item label="Semua" value="Semua" />
              <Picker.Item label="Hadir" value="Hadir" />
              <Picker.Item label="Tidak Hadir" value="Tidak Hadir" />
            </Picker>
          </View>
        </View>
      </View>
      <Gap height={11} />
      <View style={styles.positionButton}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={onFilter}>
          <Text style={styles.textButton}>Filter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <View style={styles.card}>
          <ScrollView horizontal>
            <View>
              <View style={styles.header}>
                <Text style={styles.labelName}>Nama</Text>
                <Text style={styles.labelBadge}>Kehadiran</Text>
                <Text style={styles.labelStatus}>Status</Text>
                <Text style={styles.labelWmp}>WMP</Text>
              </View>
              {attendance.map((users) => {
                return (
                  <View style={styles.body} key={users.id}>
                    <Text style={styles.valueName}>{users.nama}</Text>
                    <View style={styles.containerBadge}>
                      <View style={styles.badge(users.kehadiran)}>
                        <Text style={styles.valueBadge}>{users.kehadiran}</Text>
                      </View>
                    </View>
                    <Text style={styles.valueStatus}>{users.status}</Text>
                    <Text style={styles.valueWmp}>{users.wmp}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default RekapAttendance;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingTop: 22,
    paddingHorizontal: 11,
  },
  date: {
    flex: 1,
  },
  attendance: {
    flex: 1,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  calendar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    height: normalize(47),
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
  },
  select: {
    height: normalize(45),
  },
  positionButton: {
    alignItems: 'flex-end',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: '#286090',
    width: normalize(71),
    borderRadius: normalize(10),
    marginHorizontal: normalize(11),
  },
  textButton: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  list: {
    marginHorizontal: normalize(11),
    marginVertical: normalize(11),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    padding: normalize(20),
    marginTop: normalize(11),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#A3A3A3',
    paddingHorizontal: normalize(21),
    paddingVertical: normalize(14),
    justifyContent: 'space-between',
  },
  body: {
    flexDirection: 'row',
    paddingHorizontal: normalize(21),
    paddingVertical: normalize(14),
    justifyContent: 'space-between',
  },
  labelName: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
    width: normalize(100),
    textAlign: 'center',
    marginRight: normalize(4),
  },
  labelBadge: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
    width: normalize(100),
    textAlign: 'center',
    marginRight: normalize(4),
  },
  labelStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
    width: normalize(100),
    textAlign: 'center',
    marginRight: normalize(4),
  },
  labelWmp: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
    width: normalize(100),
    textAlign: 'center',
    marginRight: normalize(4),
  },
  labelAction: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
    width: normalize(100),
    textAlign: 'center',
    marginRight: normalize(4),
  },
  containerBadge: {
    width: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: normalize(-3),
  },
  badge: (item) => ({
    width: normalize(70),
    backgroundColor: item === 'Tidak Hadir' ? '#A3A3A3' : '#286090',
    borderRadius: normalize(5),
    paddingVertical: normalize(2),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  valueName: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
    width: normalize(100),
    marginRight: normalize(4),
    textAlign: 'center',
  },
  valueBadge: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(10),
    color: '#FFFFFF',
  },
  valueStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
    width: normalize(100),
    marginRight: normalize(4),
    textAlign: 'center',
  },
  valueWmp: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
    width: normalize(100),
    marginRight: normalize(4),
    textAlign: 'center',
  },
});
