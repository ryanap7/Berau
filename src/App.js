import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {Loading} from './components';
import FlashMessage from 'react-native-flash-message';
import NotifService from './utils/Firebase/NotifService';
import {Alert} from 'react-native';

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
  const onRegister = (token) => {
    setRegisterToken(token.token);
  };

  const onNotif = (notif) => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);

  console.log(registerToken);
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
