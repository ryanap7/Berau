import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcDownload, IcRekapData} from '../../assets';
import {Button, Gap, HeaderDetail, Select, Table} from '../../components';
import {useForm} from '../../utils';

const RekapData = ({navigation}) => {
  const [penugasan, setPenugasan] = useState('Area Tambang LMO');
  const [wmp, setWmp] = useState('WMP 1');
  const [jenisData, setJenisData] = useState('Data Pemakaian Kapur');

  const [form, setForm] = useForm({
    from: new Date(),
    to: new Date(),
    satuan: '',
  });

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || form.from;
    setForm('from', currentDate);
    setShowFrom(false);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || form.to;
    setForm('to', currentDate);
    setShowTo(false);
  };

  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={11} />
      <View style={styles.select}>
        <Select
          value={penugasan}
          type="Penugasan"
          onSelectChange={(value) => setPenugasan(value)}
        />
      </View>
      <View style={styles.containerMenu}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menu}
          onPress={() => navigation.navigate('RekapData')}>
          <IcRekapData />
          <Gap height={2} />
          <Text style={styles.menuText}>Rekap Data</Text>
        </TouchableOpacity>
        <View style={styles.wmp}>
          <View style={styles.select}>
            <Select
              value={wmp}
              type="WMP"
              onSelectChange={(value) => setWmp(value)}
            />
            <Select
              value={jenisData}
              type="Jenis Data"
              onSelectChange={(value) => setJenisData(value)}
            />
          </View>
          <View style={styles.filter}>
            <TouchableOpacity
              style={styles.calendar}
              onPress={() => setShowFrom(true)}>
              <Text>{Moment(form.from).format('DD-MM-YYYY')}</Text>
              {showFrom && (
                <DateTimePicker
                  testID="dateFrom"
                  value={form.from}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeFrom}
                />
              )}
            </TouchableOpacity>
            <View style={styles.to}>
              <Text>to</Text>
            </View>
            <TouchableOpacity
              style={styles.calendar}
              onPress={() => setShowTo(true)}>
              <Text>{Moment(form.to).format('DD-MM-YYYY')}</Text>
              {showTo && (
                <DateTimePicker
                  testID="dateTo"
                  value={form.to}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeTo}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.generate}>
            <View style={styles.satuan}>
              <Select
                value={form.satuan}
                type="TSS"
                onSelectChange={(value) => {
                  setForm('satuan', value);
                }}
              />
            </View>
            <Gap width={28} />
            <View style={styles.button}>
              <Text style={styles.text}>Generate</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Content */}
      <Table />
      <Gap height={25} />
      <View style={styles.download}>
        <Button icon={<IcDownload />} text="DOWNLOAD" />
      </View>
    </View>
  );
};

export default RekapData;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
  },
  containerMenu: {
    flexDirection: 'row',
    paddingLeft: 11,
  },
  wmp: {
    flex: 1,
  },
  select: {
    marginHorizontal: 11,
  },
  menu: {
    alignItems: 'center',
    marginTop: 16,
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#286090',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 11,
    marginBottom: 8,
  },
  calendar: {
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 6,
    borderRadius: 10,
    borderColor: '#286090',
  },
  to: {
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#3BB54A',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  download: {
    paddingHorizontal: 60,
  },
  generate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  satuan: {
    paddingLeft: 24,
    paddingTop: 15,
  },
});
