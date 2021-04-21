import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {Gap, HeaderDetail} from '../../components';

const HistoryDetail = ({navigation, route}) => {
  const data = route.params;
  const date = new Date(data.tanggal_input).toDateString();
  const hour = new Date(data.kimia.waktu_input).getHours();
  const minute = new Date(data.kimia.waktu_input).getMinutes();
  const time = hour + ':' + minute;

  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <ScrollView>
        <Text style={styles.title}>AAT</Text>
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.label}>Date Input</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Periodical Input</Text>
            <Text style={styles.value}>{data.periode_input}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Time Input</Text>
            <Text style={styles.value}>{time}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Sampling Point</Text>
            <Text style={styles.value}>{data.id_sampling_point}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Weather Cond</Text>
            <Text style={styles.value}>{data.kondisi_cuaca}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>pH</Text>
            <Text style={styles.value}>{data.ph}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>TSS</Text>
            <Text style={styles.value}>
              {data.tts} {data.tts_unit}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Fe</Text>
            <Text style={styles.value}>
              {data.fe} {data.fe_unit}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Mn</Text>
            <Text style={styles.value}>
              {data.mn} {data.mn_unit}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Debit</Text>
            <Text style={styles.value}>
              {data.debit} {data.debit_unit}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Chem. Dose</Text>
            <Text style={styles.value}>
              {data.chem_dose} {data.chem_dose_unit}
            </Text>
          </View>
        </View>
        <Gap height={20} />
        <Text style={styles.title}>Bahan Kimia</Text>
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.label}>Date Input</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Periodical Input</Text>
            <Text style={styles.value}>{data.kimia.periode_input}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Time Input</Text>
            <Text style={styles.value}>{time}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Chemicals</Text>
            <Text style={styles.value}>{data.kimia.chemical}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>% Kemurnian</Text>
            <Text style={styles.value}>{data.kimia.purity}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Stock Shift Sblm</Text>
            <Text style={styles.value}>
              {data.kimia.before} {data.kimia.before_unit}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Stock Berjalan</Text>
            <Text style={styles.value}>
              {data.kimia.current} {data.kimia.current_unit}
            </Text>
          </View>
        </View>
        <Gap height={20} />
        <Text style={styles.title}>Perbaikan</Text>
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.label}>Date Input</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Periodical Input</Text>
            <Text style={styles.value}>{data.kimia.periode_input}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Time Input</Text>
            <Text style={styles.value}>{time}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Jenis Perbaikan</Text>
            <Text style={styles.value}>{data.perbaikan.jenis_perbaikan}</Text>
          </View>
        </View>
        <Gap height={20} />
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.label}>Kegiatan Perbaikan</Text>
            <Text style={styles.value}>{data.perbaikan.keterangan}</Text>
          </View>
        </View>
        <Gap height={20} />
        {data.status === 'Diproses' && (
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => navigation.navigate('EditHistory', data)}>
              <Text style={styles.text}>Ubah</Text>
            </TouchableOpacity>
          </View>
        )}
        {data.status === 'Ditolak' && (
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => navigation.navigate('EditHistory', data)}>
              <Text style={styles.text}>Ubah</Text>
            </TouchableOpacity>
          </View>
        )}

        <Gap height={30} />
      </ScrollView>
    </View>
  );
};

export default HistoryDetail;

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
    marginHorizontal: normalize(15),
    paddingVertical: normalize(22),
    paddingHorizontal: normalize(11),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: normalize(14),
    color: '#000000',
    marginHorizontal: normalize(15),
    marginVertical: normalize(15),
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: normalize(14),
    color: '#020202',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    fontFamily: 'Poppins-Light',
    fontSize: normalize(14),
    color: '#020202',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#286090',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(67),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
});
