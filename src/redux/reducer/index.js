import {combineReducers} from 'redux';
import {globalReducer} from './global';
import {samplingPointReducer} from './assignment';
import {attReducer} from './att';
import {employeeReducer} from './employees';

const reducer = combineReducers({
  globalReducer,
  samplingPointReducer,
  attReducer,
  employeeReducer,
});

export default reducer;
