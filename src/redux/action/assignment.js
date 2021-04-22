import Axios from 'axios';
import Moment from 'moment';
import 'moment/locale/id';
import {showMessage} from '../../utils';
import {setLoading} from './global';

const API_HOST = {
  url: 'https://berau.mogasacloth.com/api/v1',
};

export const samplingPoint = () => (dispatch) => {
  Axios.get(`${API_HOST.url}/sampling-point`)
    .then((res) => {
      dispatch({type: 'GET_SAMPLING', value: res.data.data});
    })
    .catch((err) => {
      console.error(err.response);
    });
};

export const storeAtt = (form, token) => (dispatch) => {
  const date = Moment(form.date_input).format('YYYY-MM-DD');
  const time = Moment(form.time_input).format('H:mm');

  const data = {
    wmp: form.wmp,
    sampling_point: form.sampling_point,
    date_input: date,
    weather_condition: form.weather_condition,
    PH: form.PH,
    TSS: form.TSS,
    Fe: form.Fe,
    Mn: form.Mn,
    Debit: form.Debit,
    ChemDose: form.ChemDose,
    TSS_unit: form.TSS_unit,
    Fe_unit: form.Fe_unit,
    Mn_unit: form.Mn_unit,
    Debit_unit: form.Debit_unit,
    ChemDose_unit: form.ChemDose_unit,
    periodical_input: form.periodical_input,
    time_input: time,
  };

  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/att`, data, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      dispatch(setLoading(false));
      showMessage(res.data.meta.message, 'success');
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.error(err.response);
    });
};

export const storeChemical = (form, token) => (dispatch) => {
  const date = Moment(form.date_input).format('YYYY-MM-DD');
  const time = Moment(form.time_input).format('H:mm');

  const data = {
    wmp: form.wmp,
    date_input: date,
    periodical_input: form.periodical_input,
    time_input: time,
    chemical: form.chemical,
    purity: form.purity,
    before: form.before,
    before_unit: form.before_unit,
    current: form.current,
    current_unit: form.current_unit,
  };

  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/bahan-kimia`, data, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      dispatch(setLoading(false));
      showMessage(res.data.meta.message, 'success');
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.error(err.response);
    });
};

export const storeService = (form, token) => (dispatch) => {
  const date = Moment(form.date_input).format('YYYY-MM-DD');
  const time = Moment(form.time_input).format('H:mm');

  const data = {
    wmp: form.wmp,
    date_input: date,
    periodical_input: form.periodical_input,
    time_input: time,
    jenis_perbaikan: form.jenis_perbaikan,
    notif: form.notif,
    note: form.note,
  };

  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/perbaikan`, data, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      dispatch(setLoading(false));
      showMessage(res.data.meta.message, 'success');
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.error(err.response);
    });
};
