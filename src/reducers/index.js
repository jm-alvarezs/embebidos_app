import {combineReducers} from 'redux';
import DataReducer from './DataReducer';
import DeviceReducer from './DeviceReducer';

export default combineReducers({
  data: DataReducer,
  devices: DeviceReducer,
});
