import Axios from 'axios';
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import storage from '../../utils/storage';

const SyncData = ({navigation}) => {
  const API_HOST = {
    url: 'https://berau.mogasacloth.com/api/v1',
  };
  useEffect(() => {
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
        storage.getAllDataForKey('dataLocal').then((users) => {
          const data = {
            data: users,
          };
          if (data.data < 1) {
            showMessage('Maaf tidak ada Data');
            navigation.goBack();
          } else {
            Axios.post(`${API_HOST.url}/sync`, data, {
              headers: {
                Authorization: `Bearer ${ret}`,
              },
            })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  storage.clearMapForKey('dataLocal');
                  navigation.replace('SyncSuccess');
                }
              })
              .catch((err) => {
                console.log(err.response);
              });
          }
        });
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);
  return (
    <LottieView
      source={require('../../assets/Lottie/Sync.json')}
      autoPlay
      loop
    />
  );
};

export default SyncData;
