import {NavigationContainer} from '@react-navigation/native';
import Axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, AppState} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './components';
import store from './redux/store';
import Router from './router';
import NotifService from './utils/Firebase/NotifService';
import storage from './utils/storage';

const MainApp = () => {
  const {isLoading} = useSelector((state) => state.globalReducer);
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  const [registerToken, setRegisterToken] = useState('');
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [refreshToken, setRefreshToken] = useState('');

  const data = {
    refreshToken: refreshToken,
  };

  const API_HOST = {
    url: 'https://berau.mogasacloth.com/api/v1',
  };

  const onRegister = (token) => {
    setRegisterToken(token.token);
  };

  const onNotif = (notif) => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);

  useEffect(() => {
    storage
      .load({
        key: 'refreshToken',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((res) => {
        setRefreshToken(res);
      })
      .catch((err) => {
        console.warn(err.message);
      });

    if (appStateVisible === 'active') {
      Axios.post(`${API_HOST.url}/auth/refreshToken`, data).then((res) => {
        storage.remove({
          key: 'token',
        });
        storage.save({
          key: 'token',
          data: res.data.data.token,
        });
      });
    }

    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
