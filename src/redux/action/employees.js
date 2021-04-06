import Axios from 'axios';

const API_HOST = {
  url: 'https://berau.mogasacloth.com/api/v1',
};

export const getEmployees = (token) => (dispatch) => {
  Axios.get(`${API_HOST.url}/pegawai`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    dispatch({type: 'SET_PEGAWAI', value: res.data.data});
  });
};
