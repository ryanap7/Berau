import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {storeData, useForm} from '../../../utils';
import {TextInput} from '../../atoms';

const PerbaikanData = () => {
  const [form, setForm] = useForm({
    note: '',
  });

  storeData('PerbaikanData', form);

  return (
    <View>
      <Text style={styles.labelNote}>Deskripsi Kegiatan</Text>
      <TextInput
        style={styles.note}
        value={form.note}
        onChangeText={(value) => setForm('note', value)}
      />
    </View>
  );
};

export default PerbaikanData;

const styles = StyleSheet.create({
  labelNote: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#020202',
    textAlign: 'left',
    marginHorizontal: 45,
  },
  note: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 45,
    marginVertical: 13,
    width: '75%',
    height: 200,
  },
});
