import Axios from 'axios';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import {IcAddAttendance, IcEdit, IcTrashAttendance} from '../../assets';
import {Button, Gap, HeaderDetail, Select, TextInput} from '../../components';
import {showMessage, useForm} from '../../utils';
import storage from '../../utils/storage';
import {setLoading} from '../../redux/action/global';

const ModalPopUp = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, []);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const PersonalData = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState('');
  const [pegawai, setPegawai] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [data, setData] = useState();

  const [form, setForm] = useForm({
    status: 'Dedicated',
    wmp: '1',
  });

  const currentDate = Moment(new Date()).format('YYYY-MM-DD');

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
        getDataAttendance();
        getDataEmployee();
      })
      .catch((err) => {
        console.error(err.response);
      });
  });

  const dispatch = useDispatch();

  const getDataEmployee = async () => {
    const response = await Axios.get(`${API_HOST.url}/pegawai`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPegawai(response.data.data.pegawai);
  };

  const getDataAttendance = async () => {
    const response = await Axios.get(`${API_HOST.url}/absen`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAttendance(response.data.data);
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

  const openModal = (item) => {
    setVisible(true);
    setData(item);
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
                  <Gap width={100} />
                  <Text style={styles.labelAction}>Action</Text>
                </View>
                {pegawai.map((res) => {
                  return (
                    <View style={styles.body} key={res.id}>
                      <TouchableOpacity
                        style={styles.padding}
                        onPress={() => openModal(res)}>
                        <Text style={styles.valueName}>{res.nama}</Text>
                      </TouchableOpacity>
                      <View style={styles.valueAction}>
                        <TouchableOpacity
                          style={styles.padding}
                          activeOpacity={0.7}
                          onPress={() =>
                            navigation.navigate('EditAttendance', res)
                          }>
                          <IcEdit />
                        </TouchableOpacity>
                        <Gap width={10} />
                        <TouchableOpacity
                          style={styles.padding}
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
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Modal Detail */}
        <ModalPopUp visible={visible}>
          <View style={styles.containerModal}>
            <View style={styles.headerModal}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <View style={styles.buttonClose}>
                  <Text style={styles.textClose}>Close</Text>
                </View>
              </TouchableOpacity>
              <Gap height={30} />
            </View>
            <View style={styles.contentModal}>
              <View style={styles.input}>
                <Text style={styles.labelForm}>Status: </Text>
                <Select
                  value={form.status}
                  type="Status"
                  onSelectChange={(value) => setForm('status', value)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.labelForm}>WMP: </Text>
                <Select
                  value={form.wmp}
                  type="WMP"
                  onSelectChange={(value) => setForm('wmp', value)}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.labelForm}>Kehadiran: </Text>
                <TextInput value="Hadir" editable={false} />
              </View>
              <Gap height={10} />
              <View style={styles.button}>
                <Button
                  text="Simpan"
                  onPress={() => {
                    const dataForSubmit = {
                      id_pegawai: data.id,
                      status: 'Hadir',
                      tanggal: currentDate,
                      status_pegawai: form.status,
                      id_wmp: form.wmp,
                    };
                    dispatch(setLoading(true));
                    Axios.post(`${API_HOST.url}/absen`, dataForSubmit, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                      .then((result) => {
                        dispatch(setLoading(false));
                        showMessage(result.data.meta.message, 'success');
                        setVisible(false);
                      })
                      .catch((err) => {
                        dispatch(setLoading(false));
                        console.err(err.response);
                      });
                  }}
                />
              </View>
            </View>
          </View>
        </ModalPopUp>
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(2),
    paddingVertical: normalize(30),
    borderRadius: normalize(20),
    elevation: normalize(20),
  },
  contentModal: {
    alignItems: 'center',
  },
  headerModal: {
    marginHorizontal: normalize(20),
  },
  textModal: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
  buttonClose: {
    alignItems: 'flex-end',
  },
  textClose: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
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
  labelForm: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
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
    paddingVertical: normalize(18),
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
  padding: {
    padding: normalize(8),
  },
  input: {
    width: '80%',
  },
});
