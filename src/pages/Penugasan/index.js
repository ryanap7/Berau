import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import normalize from 'react-native-normalize';
import {
  IcHistory,
  IcInputData,
  IcPersonalData,
  IcRekapData,
} from '../../assets';
import {Gap, HeaderDetail, Select} from '../../components';
import storage from '../../utils/storage';

const Penugasan = ({navigation}) => {
  const [penugasan, setPenugasan] = useState('');
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
      .then((res) => {
        setPenugasan(res.nama);
        setWmp(res.wmp);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

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
          onPress={() => navigation.navigate('InputData')}>
          <IcInputData />
          <Text style={styles.menuText}>Input Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menu}
          onPress={() => navigation.navigate('RekapData')}>
          <IcRekapData />
          <Text style={styles.menuText}>Rekap Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menu}
          onPress={() => navigation.navigate('RekapAttendance')}>
          <IcPersonalData />
          <Text style={styles.menuText}>Rekap Absensi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.menu}
          onPress={() => navigation.navigate('History')}>
          <IcHistory />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
      </View>
      {/* Maps */}
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: -4.8021423,
            longitude: 107.5284487,
            latitudeDelta: 35,
            longitudeDelta: 35,
          }}
          followUserLocation={true}
          mapType="standard">
          {wmp.map((data, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: Number(data.lat),
                  longitude: Number(data.long),
                }}>
                <Callout>
                  <Text>{data.nama}</Text>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
    </View>
  );
};

export default Penugasan;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(45),
    paddingVertical: normalize(12),
  },
  container: {
    height: normalize(525),
    alignItems: 'center',
    marginVertical: normalize(11),
    marginHorizontal: normalize(15),
  },
  select: {
    marginHorizontal: normalize(15),
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: '#286090',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
