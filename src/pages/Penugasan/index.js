import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcRekapData, IcInputData, IcPersonalData} from '../../assets';
import {Gap, HeaderDetail, Select} from '../../components';
import MapView, {Callout, Marker} from 'react-native-maps';
import {getData} from '../../utils';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const Penugasan = ({navigation}) => {
  const [role, setRole] = useState('');
  const [penugasan, setPenugasan] = useState('Area Tambang SMO');
  const [currentLocation, setCurrentLocation] = useState(initialState);
  const [wmp, setWmp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;

        setCurrentLocation({
          ...currentLocation,
          latitude,
          longitude,
        });
        setIsLoading(false);
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000},
    );
    getData('userProfile').then((res) => {
      setRole(res.level.lev_nama);
    });
    getData('tambang').then((res) => {
      setPenugasan(res.nama);
      setWmp(res.wmp);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <LottieView
          source={require('../../assets/Lottie/Loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return currentLocation.latitude ? (
    <View style={styles.page}>
      <HeaderDetail
        onPress={() => navigation.goBack()}
        company="PT. Berau Coal"
      />
      <Gap height={11} />
      {role === 'Pengawas' && (
        <Select
          value={penugasan}
          type="Penugasan"
          onSelectChange={(value) => setPenugasan(value)}
          enabled={false}
        />
      )}
      {role === 'Highest Administrator' && (
        <Select
          value={penugasan}
          type="Penugasan"
          onSelectChange={(value) => setPenugasan(value)}
          enabled={true}
        />
      )}
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
          onPress={() => navigation.navigate('DataPetugas')}>
          <IcPersonalData />
          <Text style={styles.menuText}>Data Petugas</Text>
        </TouchableOpacity>
      </View>
      {/* Maps */}
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={currentLocation}
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
  ) : (
    <ActivityIndicator style={styles.map} animating size="large" />
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
    paddingHorizontal: 45,
    paddingVertical: 12,
  },
  container: {
    height: '70%',
    alignItems: 'center',
    margin: 11,
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
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
