const initSamplingState = {
  sampling: [],
};

export const samplingPointReducer = (state = initSamplingState, action) => {
  if (action.type === 'GET_SAMPLING') {
    return {
      ...state,
      sampling: action.value,
    };
  }
  return state;
};
