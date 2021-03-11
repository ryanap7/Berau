import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {IcDownload, IcRekapData} from '../../assets';
import {Button, Gap, HeaderDetail, Select, Table} from '../../components';

const RekapData = ({navigation}) => {
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const [penugasan, setPenugasan] = useState('Area Tambang LMO');
  const [wmp, setWmp] = useState('WMP 1');
  const [jenisData, setJenisData] = useState('Data Pemakaian Kapur');

  return (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={11} />
      <Select
        value={penugasan}
        type="Penugasan"
        onSelectChange={(value) => setPenugasan(value)}
      />
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
          <View style={styles.filter}>
            <View>
              <DatePicker
                style={styles.datePicker}
                date={date}
                mode="date"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                format="DD/MM/YYYY"
                customStyles={{
                  dateInput: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#286090',
                  },
                }}
                onDateChange={(data) => {
                  setDate(data);
                }}
              />
            </View>
            <View style={styles.to}>
              <Text>to</Text>
            </View>
            <View>
              <DatePicker
                style={styles.datePicker}
                date={date}
                mode="date"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                format="DD/MM/YYYY"
                customStyles={{
                  dateInput: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#286090',
                  },
                }}
                onDateChange={(data) => {
                  setDate(data);
                }}
              />
            </View>
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
    justifyContent: 'space-between',
    marginHorizontal: 11,
  },
  datePicker: {
    width: 100,
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
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  download: {
    paddingHorizontal: 60,
  },
});
