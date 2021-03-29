import 'moment/locale/id';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Button, Gap, HeaderDetail, Select} from '../../components';
import {useForm} from '../../utils';

const AddAttendance = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    status: 'Dedicated',
    wmp: 1,
  });
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
              value={form.name}
              placeholder="Masukkan Nama"
              onChangeText={(value) => setForm('name', value)}
            />
          </View>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Status</Text>
          <Select
            value={form.status}
            type="Status"
            onSelectChange={(value) => {
              setForm('wmp', value);
            }}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>WMP</Text>
          <Select
            value={form.wmp}
            type="WMP"
            onSelectChange={(value) => {
              setForm('wmp', value);
            }}
          />
        </View>
        <View>
          <Button text="Submit" />
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
  },
});
