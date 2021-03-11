const initAttState = {
  date_input: new Date(),
  periodical_input: '',
  time_input: new Date(),
  sampling_point: 'Sebelum Titik Pengapuran',
  weather_condition: 'Cerah',
  PH: '',
  TSS: '',
  TSS_unit: 'mg/L',
  Fe: '',
  Fe_unit: 'mg/L',
  Mn: '',
  Mn_unit: 'mg/L',
  Debit: '',
  Debit_unit: 'm3/detik',
  ChemDose: '',
  ChemDose_unit: 'mg/L',
};

export const attReducer = (state = initAttState, action) => {
  if (action.type === 'SET_ATT') {
    return {
      ...state,
      date_input: action.value.date_input,
      periodical_input: action.value.periodical_input,
      time_input: action.value.time_input,
      sampling_point: action.value.sampling_point,
      weather_condition: action.value.weather_condition,
      PH: action.value.PH,
      TSS: action.value.TSS,
      TSS_unit: action.value.TSS_unit,
      Fe: action.value.Fe,
      Fe_unit: action.value.Fe_unit,
      Mn: action.value.Mn,
      Mn_unit: action.value.Mn_unit,
      Debit: action.value.Debit,
      Debit_unit: action.value.Debit_unit,
      ChemDose: action.value.ChemDose,
      ChemDose_unit: action.value.ChemDose_unit,
    };
  }
  return state;
};
