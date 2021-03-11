import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {storeData, useForm} from '../../../utils';
import {Gap, Select, TextInput} from '../../atoms';

const ChemicalData = () => {
  const [form, setForm] = useForm({
    before: '',
    before_unit: 'L',
    current: '',
    current_unit: 'L',
  });

  storeData('ChemicalData', form);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Stock Shift Sebelumnya</Text>
        </View>
        <View style={styles.containerInput}>
          <View style={styles.containerTimeInput}>
            <View style={styles.leftContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="Input"
                value={form.before}
                onChangeText={(value) => setForm('before', value)}
              />
            </View>
            <Gap width={16} />
            <View style={styles.rightContainer}>
              <Gap height={12} />
              <Select
                value={form.before_unit}
                type="Before"
                onSelectChange={(value) => setForm('before_unit', value)}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Stock Saat ini</Text>
        </View>
        <View style={styles.containerInput}>
          <View style={styles.containerTimeInput}>
            <View style={styles.leftContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="Input"
                value={form.current}
                onChangeText={(value) => setForm('current', value)}
              />
            </View>
            <Gap width={16} />
            <View style={styles.rightContainer}>
              <Gap height={12} />
              <Select
                value={form.current_unit}
                type="Current"
                onSelectChange={(value) => setForm('current_unit', value)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChemicalData;

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
});
