import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {samplingPoint} from '../../../redux/action/assignment';
import {getData} from '../../../utils';

const Select = ({value, onSelectChange, type, enabled}) => {
  const [wmp, setWmp] = useState([]);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getData('token').then((res) => {
      setToken(res.value);
    });
    getData('tambang').then((res) => {
      setWmp(res.wmp);
    });
  }, []);

  // Get Sampling Point
  dispatch(samplingPoint(token));

  const {samplingPointReducer} = useSelector((state) => state);

  return (
    <View style={styles.container}>
      {type === 'Penugasan' && (
        <View style={styles.input}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onSelectChange(itemValue)}
            enabled={enabled}>
            <Picker.Item label="Area Tambang LMO" value="Area Tambang LMO" />
            <Picker.Item
              label="Area Tambang BMO I"
              value="Area Tambang BMO I"
            />
            <Picker.Item
              label="Area Tambang BMO II"
              value="Area Tambang BMO II"
            />
            <Picker.Item label="Area Tambang SMO" value="Area Tambang SMO" />
            <Picker.Item label="Area Tambang BBE" value="Area Tambang BBE" />
            <Picker.Item label="Area Tambang GMO" value="Area Tambang GMO" />
          </Picker>
        </View>
      )}
      {type === 'WMP' && (
        <View style={styles.input}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            {wmp.map((data, index) => {
              return (
                <Picker.Item key={index} label={data.nama} value={data.id} />
              );
            })}
          </Picker>
        </View>
      )}
      {type === 'Jenis Data' && (
        <View style={styles.input}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="Kualitas ATT" value="Kualitas ATT" />
            <Picker.Item
              label="Data Pemakaian Kapur"
              value="Data Pemakaian Kapur"
            />
            <Picker.Item
              label="Data Pemakaian Tawas"
              value="Data Pemakaian Tawas"
            />
            <Picker.Item label="Data Stock Kapur" value="Data Stock Kapur" />
            <Picker.Item label="Data Stock Tawas" value="Data Stock Tawas" />
            <Picker.Item
              label="Data Stock Kapur & Tawas"
              value="Data Stock Kapur & Tawas"
            />
          </Picker>
        </View>
      )}
      {type === 'Jabatan' && (
        <View style={styles.input}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="Operator" value="Operator" />
            <Picker.Item
              label="Pengambil Contoh Uji (PPC)"
              value="Pengambil Contoh Uji (PPC)"
            />
            <Picker.Item
              label="Teknisi/Maintenance"
              value="Teknisi/Maintenance"
            />
            <Picker.Item label="Pengawas Lapangan" value="Pengawas Lapangan" />
            <Picker.Item label="QA/QC" value="QA/QC" />
            <Picker.Item
              label="Highest Administrator"
              value="Highest Administrator"
            />
          </Picker>
        </View>
      )}
      {type === 'Periodical' && (
        <View style={styles.containerSelect}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="Per Jam" value="Per Jam" />
            <Picker.Item label="Per 3 Jam" value="Per 3 Jam" />
            <Picker.Item label="Per 6 Jam" value="Per 6 Jam" />
            <Picker.Item label="Per Hari" value="Per Hari" />
            <Picker.Item label="Per Bulan" value="Per Bulan" />
          </Picker>
        </View>
      )}
      {type === 'Sampling' && (
        <View style={styles.containerSelect}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            {samplingPointReducer.sampling.sampling_point.map((data, index) => {
              return (
                <Picker.Item key={index} label={data.nama} value={data.id} />
              );
            })}
          </Picker>
        </View>
      )}
      {type === 'Chemical' && (
        <View style={styles.containerSelect}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="Kapur" value="Kapur" />
            <Picker.Item label="Tawas" value="Tawas" />
          </Picker>
        </View>
      )}
      {type === 'Perbaikan' && (
        <View style={styles.containerSelect}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="Pengerukan" value="Pengerukan" />
            <Picker.Item label="Alat Sparing" value="Alat Sparing" />
          </Picker>
        </View>
      )}
      {type === 'Weather' && (
        <View style={styles.containerSelect}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="Cerah" value="Cerah" />
            <Picker.Item label="Mendung" value="Mendung" />
            <Picker.Item label="Hujan" value="Hujan" />
            <Picker.Item label="Gerimis" value="Gerimis" />
            <Picker.Item label="Hujan Deras" value="Hujan Deras" />
          </Picker>
        </View>
      )}
      {type === 'TSS' && (
        <View style={styles.containerSelectSmall}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="mg/L" value="mg/L" />
            <Picker.Item label="Ppm" value="Ppm" />
            <Picker.Item label="g/L" value="g/L" />
            <Picker.Item label="kg/L" value="kg/L" />
          </Picker>
        </View>
      )}
      {type === 'Fe' && (
        <View style={styles.containerSelectSmall}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="mg/L" value="mg/L" />
            <Picker.Item label="Ppm" value="Ppm" />
            <Picker.Item label="g/L" value="g/L" />
            <Picker.Item label="kg/L" value="kg/L" />
          </Picker>
        </View>
      )}
      {type === 'Mn' && (
        <View style={styles.containerSelectSmall}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="mg/L" value="mg/L" />
            <Picker.Item label="Ppm" value="Ppm" />
            <Picker.Item label="g/L" value="g/L" />
            <Picker.Item label="kg/L" value="kg/L" />
          </Picker>
        </View>
      )}
      {type === 'Debit' && (
        <View style={styles.containerSelectSmall}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="m3/detik" value="m3/detik" />
            <Picker.Item label="m3/jam" value="m3/jam" />
            <Picker.Item label="m3/hari" value="m3/hari" />
            <Picker.Item label="L/detik" value="L/detik" />
            <Picker.Item label="L/jam" value="L/jam" />
            <Picker.Item label="L/hari" value="L/hari" />
          </Picker>
        </View>
      )}
      {type === 'Dose' && (
        <View style={styles.containerSelectSmall}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="mg/L" value="mg/L" />
            <Picker.Item label="Ppm" value="Ppm" />
            <Picker.Item label="g/L" value="g/L" />
            <Picker.Item label="kg/L" value="kg/L" />
          </Picker>
        </View>
      )}
      {type === 'Before' && (
        <View style={styles.containerSelectSmall}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="L" value="L" />
            <Picker.Item label="Kg" value="Kg" />
            <Picker.Item label="Karung" value="Karung" />
            <Picker.Item label="Drum" value="Drum" />
          </Picker>
        </View>
      )}
      {type === 'Current' && (
        <View style={styles.containerSelectSmall}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="L" value="L" />
            <Picker.Item label="Kg" value="Kg" />
            <Picker.Item label="Karung" value="Karung" />
            <Picker.Item label="Drum" value="Drum" />
          </Picker>
        </View>
      )}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    paddingHorizontal: 2,
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginHorizontal: 11,
    marginBottom: 11,
  },
  containerSelect: {
    width: 200,
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    paddingHorizontal: 2,
    backgroundColor: '#FFFFFF',
    marginTop: -10,
  },
  containerSelectSmall: {
    width: 94,
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: 10,
    paddingHorizontal: 2,
    backgroundColor: '#FFFFFF',
    marginTop: -12,
    marginLeft: -12,
  },
  select: {
    height: 40,
  },
});
