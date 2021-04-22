import DateTimePicker from '@react-native-community/datetimepicker';
import Axios from 'axios';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcRekapData} from '../../assets';
import {Gap, HeaderDetail, Select, Table} from '../../components';
import {useForm} from '../../utils';
import storage from '../../utils/storage';

const RekapData = ({navigation}) => {
  const [penugasan, setPenugasan] = useState('Area Tambang LMO');
  const [dataHeader, setDataHeader] = useState([]);
  const [data, setData] = useState([]);
  const [dataWidth, setDataWidth] = useState([]);

  const API_HOST = {
    url: 'https://berau.mogasacloth.com/api/v1',
  };

  const [form, setForm] = useForm({
    wmp: '1',
    jenis_data: 'Data Pemakaian Kapur',
    from: new Date(),
    to: new Date(),
  });

  const from = Moment(form.from).format('YYYY-MM-DD');
  const to = Moment(form.to).format('YYYY-MM-DD');

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
      .then((res) => {
        setPenugasan(res.nama);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

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

  const onFilter = () => {
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
        Axios.get(
          `${API_HOST.url}/report/area-tambang?id_wmp=${form.wmp}&jenis_data=${form.jenis_data}&from=${from}&to=${to}`,
          {
            headers: {
              Authorization: `Bearer ${ret}`,
            },
          },
        )
          .then((res) => {
            setDataHeader(res.data.data_field);
            setData(res.data.data_rows);
            setDataWidth(res.data.data_width);
          })
          .catch((err) => {
            console.error(err.response);
          });
      })
      .catch((err) => {
        console.error(err.response);
      });
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
          enabled={false}
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
              value={form.wmp}
              type="WMP"
              onSelectChange={(value) => setForm('wmp', value)}
            />
            <Select
              value={form.jenis_data}
              type="Jenis Data"
              onSelectChange={(value) => setForm('jenis_data', value)}
            />
          </View>
          <View style={styles.filter}>
            <TouchableOpacity
              style={styles.calendar}
              onPress={() => setShowFrom(true)}>
              <Text style={styles.textCalendar}>
                {Moment(form.from).format('DD-MM-YYYY')}
              </Text>
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
              <Text style={styles.textCalendar}>
                {Moment(form.to).format('DD-MM-YYYY')}
              </Text>
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
            <Gap width={15} />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={onFilter}>
              <Text style={styles.text}>Generate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Content */}
      <Table dataHeader={dataHeader} data={data} dataWidth={dataWidth} />
      <Gap height={25} />
      {/* <View style={styles.download}>
        <Button icon={<IcDownload />} text="DOWNLOAD" />
      </View> */}
    </View>
  );
};

export default RekapData;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: normalize(20),
  },
  containerMenu: {
    flexDirection: 'row',
    paddingLeft: normalize(15),
  },
  wmp: {
    flex: 1,
  },
  select: {
    marginHorizontal: normalize(15),
  },
  menu: {
    alignItems: 'center',
    marginTop: normalize(16),
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#286090',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(15),
    marginBottom: normalize(8),
  },
  calendar: {
    borderWidth: 1,
    paddingHorizontal: normalize(17),
    paddingVertical: normalize(6),
    borderRadius: normalize(10),
    borderColor: '#286090',
    height: normalize(40),
  },
  textCalendar: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    padding: normalize(8),
  },
  to: {
    marginHorizontal: normalize(5),
  },
  button: {
    backgroundColor: '#3BB54A',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(6),
    borderRadius: normalize(10),
    marginLeft: normalize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
  download: {
    paddingHorizontal: normalize(60),
  },
  generate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  satuan: {
    paddingLeft: normalize(24),
    paddingTop: normalize(15),
    marginLeft: normalize(7),
  },
});
