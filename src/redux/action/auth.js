import Axios from 'axios';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';

const API_HOST = {
  url: 'https://berau.mogasacloth.com/api/v1',
};

export const signInAction = (form, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/auth`, form)
    .then((res) => {
      const refreshToken = res.data.data.refreshToken;
      const token = res.data.data.token;
      const profile = res.data.data.user;
      const tambang = res.data.data.tambang;

      dispatch(setLoading(false));

      storeData('token', {value: token});
      storeData('refreshToken', {value: refreshToken});
      storeData('userProfile', profile);
      storeData('tambang', tambang);
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.meta?.message);
    });
};
