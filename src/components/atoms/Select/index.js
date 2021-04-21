import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';
import storage from '../../../utils/storage';

const Select = ({value, onSelectChange, type, enabled}) => {
  const [wmp, setWmp] = useState([]);

  useEffect(() => {
    storage
      .load({
        key: 'tambang',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((ret) => {
        setWmp(ret.wmp);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      {type === 'Penugasan' && (
        <View style={styles.input}>
          <Picker
            selectedValue={value}
            style={styles.select}
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
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            {wmp.map((data, index) => {
              return (
                <Picker.Item key={index} label={data.nama} value={data.id} />
              );
            })}
          </Picker>
        </View>
      )}
      {type === 'Status' && (
        <View style={styles.input}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="Dedicated" value="Dedicated" />
            <Picker.Item label="Mobile" value="Mobile" />
          </Picker>
        </View>
      )}
      {type === 'Jenis Data' && (
        <View style={styles.input}>
          <Picker
            selectedValue={value}
            style={styles.select}
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
            style={styles.select}
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
            {/* {samplingPointReducer.sampling.sampling_point.map((data, index) => {
              return (
                <Picker.Item key={index} label={data.nama} value={data.id} />
              );
            })} */}
            <Picker.Item
              label="Sebelum titik Pengapuran"
              value="Sebelum titik Pengapuran"
            />
            <Picker.Item
              label="Sebelum Titik Penawasan"
              value="Sebelum Titik Penawasan"
            />
            <Picker.Item
              label="Pintu Masuk Sedement Pond"
              value="Pintu Masuk Sedement Pond"
            />
            <Picker.Item
              label="Titik Penataan (Pintu Effluent)"
              value="Titik Penataan (Pintu Effluent)"
            />
            <Picker.Item
              label="Titik Lainnya (diSPORING)"
              value="Titik Lainnya (diSPORING)"
            />
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
            <Picker.Item label="Kapur & Tawas" value="Kapur & Tawas" />
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
      {type === 'Notif' && (
        <View style={styles.containerSelect}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="Ya" value="Ya" />
            <Picker.Item label="Tidak" value="Tidak" />
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
            <Picker.Item label="m3/hari" value="m3/hari" />
          </Picker>
        </View>
      )}
      {type === 'Dose' && (
        <View style={styles.containerSelectSmall}>
          <Picker
            selectedValue={value}
            style={styles.select}
            onValueChange={(itemValue) => onSelectChange(itemValue)}>
            <Picker.Item label="L" value="L" />
            <Picker.Item label="Kg" value="Kg" />
            <Picker.Item label="Karung" value="Karung" />
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
    borderRadius: normalize(10),
    paddingHorizontal: normalize(2),
    backgroundColor: '#FFFFFF',
  },
  Attendance: {
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(2),
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginBottom: normalize(11),
  },
  containerSelect: {
    width: normalize(185),
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(2),
    backgroundColor: '#FFFFFF',
  },
  containerSelectSmall: {
    width: normalize(94),
    borderWidth: 1,
    borderColor: '#286090',
    borderRadius: normalize(10),
    paddingHorizontal: 2,
    backgroundColor: '#FFFFFF',
    marginTop: normalize(-8),
    marginLeft: normalize(-12),
  },
  select: {
    height: normalize(40),
  },
});
