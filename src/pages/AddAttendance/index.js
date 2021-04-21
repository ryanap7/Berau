import Axios from 'axios';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import {Button, Gap, HeaderDetail} from '../../components';
import {setLoading} from '../../redux/action';
import {showMessage, useForm} from '../../utils';
import storage from '../../utils/storage';

const AddAttendance = ({navigation, route}) => {
  const [token, setToken] = useState('');
  const [form, setForm] = useForm({
    nama: '',
  });

  const dispatch = useDispatch();

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
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  const onSubmit = () => {
    dispatch(setLoading(true));
    Axios.post(`${API_HOST.url}/pegawai/create`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(setLoading(false));
        showMessage(res.data.meta.message, 'success');
        navigation.replace('PersonalData');
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  };
  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={11} />
      <View style={styles.card}>
        <View style={styles.form}>
          <Text style={styles.label}>Nama</Text>
          <View style={styles.textInput}>
            <TextInput
              value={form.nama}
              placeholder="Masukkan Nama"
              onChangeText={(value) => setForm('nama', value)}
            />
          </View>
        </View>
        <View>
          <Button text="Submit" onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
};

export default AddAttendance;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(10),
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    marginVertical: normalize(11),
    marginHorizontal: normalize(15),
    paddingVertical: normalize(22),
    paddingHorizontal: normalize(18),
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#000000',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    marginTop: normalize(5),
    marginBottom: normalize(11),
    paddingHorizontal: normalize(15),
    height: normalize(40),
  },
});
