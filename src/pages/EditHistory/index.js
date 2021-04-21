import Axios from 'axios';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {Gap} from '../../components';
import {showMessage, useForm} from '../../utils';
import storage from '../../utils/storage';

const EditHistory = ({navigation, route}) => {
  const data = route.params;
  const API_HOST = {
    url: 'https://berau.mogasacloth.com/api/v1',
  };

  const [form, setForm] = useForm({
    PH: data.ph.toString(),
    TSS: data.tts.toString(),
    Fe: data.fe.toString(),
    Mn: data.mn.toString(),
    Debit: data.debit.toString(),
    ChemDose: data.chem_dose.toString(),
  });

  const onSubmit = () => {
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
        Axios.put(`${API_HOST.url}/att/${data.id}`, form, {
          headers: {
            Authorization: `Bearer ${ret}`,
          },
        })
          .then((res) => {
            console.log(res.data.meta.message);
            showMessage(res.data.meta.message, 'success');
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.warn(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Gap height={20} />
        <Text style={styles.title}>Edit Data</Text>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.label}>pH</Text>
            <TextInput
              style={styles.input}
              value={form.PH}
              onChangeText={(value) => setForm('PH', value)}
            />
            <Text style={styles.label}>TSS</Text>
            <TextInput
              style={styles.input}
              value={form.TSS}
              onChangeText={(value) => setForm('TSS', value)}
            />
            <Text style={styles.label}>Fe</Text>
            <TextInput
              style={styles.input}
              value={form.Fe}
              onChangeText={(value) => setForm('Fe', value)}
            />
            <Text style={styles.label}>Mn</Text>
            <TextInput
              style={styles.input}
              value={form.Mn}
              onChangeText={(value) => setForm('Mn', value)}
            />
            <Text style={styles.label}>Debit</Text>
            <TextInput
              style={styles.input}
              value={form.Debit}
              onChangeText={(value) => setForm('Debit', value)}
            />
            <Text style={styles.label}>Chem. Dose</Text>
            <TextInput
              style={styles.input}
              value={form.ChemDose}
              onChangeText={(value) => setForm('ChemDose', value)}
            />
          </View>
          <Gap height={20} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={onSubmit}>
              <Text style={styles.buttonText}>Ubah Data</Text>
            </TouchableOpacity>
            <Gap height={10} />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => navigation.replace('History')}>
              <Text style={styles.buttonText}>Kembali ke History</Text>
            </TouchableOpacity>
            <Gap height={20} />
          </View>
          <Gap height={50} />
        </ScrollView>
      </View>
    </View>
  );
};

export default EditHistory;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(22),
    marginHorizontal: normalize(15),
    marginVertical: normalize(20),
    borderRadius: normalize(10),
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(16),
    color: '#000',
    marginHorizontal: normalize(15),
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#000',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#A8A8A8',
    marginBottom: normalize(15),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(47),
  },
  button: {
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(57),
    backgroundColor: '#286090',
    borderRadius: normalize(10),
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
});
