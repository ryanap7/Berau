import Axios from 'axios';
import {showMessage} from '../../utils';
import storage from '../../utils/storage';
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

      storage.save({
        key: 'token',
        data: token,
      });

      storage.save({
        key: 'refreshToken',
        data: refreshToken,
      });

      storage.save({
        key: 'profile',
        data: profile,
      });

      storage.save({
        key: 'tambang',
        data: tambang,
      });

      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err.response);
      showMessage(err?.response?.data?.meta?.message);
    });
};
