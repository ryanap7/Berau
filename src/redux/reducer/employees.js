const initSamplingState = {
  pegawai: [],
};

export const employeeReducer = (state = initSamplingState, action) => {
  if (action.type === 'SET_PEGAWAI') {
    return {
      ...state,
      pegawai: action.value,
    };
  }
  return state;
};
