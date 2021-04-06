import Axios from 'axios';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {IcAddAttendance, IcEdit, IcTrashAttendance} from '../../assets';
import {Button, Gap, HeaderDetail} from '../../components';
import {getData, showMessage} from '../../utils';

const PersonalData = ({navigation}) => {
  const [token, setToken] = useState('');
  const [pegawai, setPegawai] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const currentDate = Moment(new Date()).format('YYYY-MM-DD');

  const API_HOST = {
    url: 'https://berau.mogasacloth.com/api/v1',
  };

  useEffect(() => {
    getDataAttendance();
    getDataEmployee();
    getData('token').then((res) => {
      setToken(res.value);
    });
  });

  const getDataEmployee = () => {
    Axios.get(`${API_HOST.url}/pegawai`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setPegawai(res.data.data.pegawai);
    });
  };

  const getDataAttendance = () => {
    Axios.get(`${API_HOST.url}/absen`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setAttendance(res.data.data);
    });
  };

  const onDelete = (item) => {
    Axios.delete(`${API_HOST.url}/pegawai/delete/${item.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        getDataEmployee();
        showMessage(result.data.meta.message, 'success');
      })
      .catch((err) => console.log('Error: ', err));
  };

  const selectedItem = (item) => {
    const data = {
      id_pegawai: item.id,
      status: 'Hadir',
      tanggal: currentDate,
    };

    Axios.post(`${API_HOST.url}/absen`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log('Error: ', err));
  };

  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <ScrollView>
        <Gap height={11} />
        <View style={styles.button}>
          <Button
            text="Add"
            icon={<IcAddAttendance />}
            onPress={() => navigation.navigate('AddAttendance')}
          />
        </View>
        <View style={styles.list}>
          <Text style={styles.label}>Kehadiran</Text>
          <View style={styles.card}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.header}>
                  <Text style={styles.labelName}>Nama</Text>
                  <Text style={styles.labelBadge}>Kehadiran</Text>
                  <Text style={styles.labelStatus}>Status</Text>
                  <Text style={styles.labelWmp}>WMP</Text>
                </View>
                {attendance.map((res) => {
                  return (
                    <View style={styles.body} key={res.id}>
                      <Text style={styles.valueName}>{res.nama}</Text>
                      <View style={styles.containerBadge}>
                        <View style={styles.badge(res.kehadiran)}>
                          <Text style={styles.valueBadge}>{res.kehadiran}</Text>
                        </View>
                      </View>
                      <Text style={styles.valueStatus}>{res.status}</Text>
                      <Text style={styles.valueWmp}>{res.wmp}</Text>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        {/* Daftar Anggota */}
        <View style={styles.list}>
          <Text style={styles.label}>Daftar Anggota</Text>

          <View style={styles.card}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.header}>
                  <Text style={styles.labelName}>Nama</Text>
                  <Text style={styles.labelStatus}>Status</Text>
                  <Text style={styles.labelWmp}>WMP</Text>
                  <Text style={styles.labelAction}>Action</Text>
                </View>
                {pegawai.map((res) => {
                  return (
                    <TouchableOpacity
                      style={styles.body}
                      key={res.id}
                      onPress={() => selectedItem(res)}>
                      <Text style={styles.valueName}>{res.nama}</Text>
                      <Text style={styles.valueStatus}>{res.status}</Text>
                      <Text style={styles.valueWmp}>{res.wmp.nama}</Text>
                      <View style={styles.valueAction}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            navigation.navigate('EditAttendance', res)
                          }>
                          <IcEdit />
                        </TouchableOpacity>
                        <Gap width={10} />
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert('Warning', 'Are you sure?', [
                              {
                                text: 'No',
                                onPress: () => getDataEmployee(),
                              },
                              {
                                text: 'Yes',
                                onPress: () => onDelete(res),
                              },
                            ])
                          }>
                          <IcTrashAttendance />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
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
    marginHorizontal: normalize(15),
  },
  labelDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    backgroundColor: '#FFFFFF',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
    marginTop: normalize(5),
  },
  placeholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#286090',
    marginHorizontal: normalize(9),
  },
  button: {
    margin: normalize(11),
    alignItems: 'flex-end',
  },
  list: {
    marginHorizontal: normalize(15),
    marginVertical: normalize(15),
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
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
    backgroundColor: item === 'Hadir' ? '#286090' : '#A3A3A3',
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
  valueAction: {
    flexDirection: 'row',
    width: normalize(100),
    marginRight: normalize(4),
    justifyContent: 'center',
  },
});
