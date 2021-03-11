import {combineReducers} from 'redux';
import {globalReducer} from './global';
import {samplingPointReducer} from './assignment';
import {attReducer} from './att';

const reducer = combineReducers({
  globalReducer,
  samplingPointReducer,
  attReducer,
});

export default reducer;
