import {combineReducers} from 'redux';
import DataReducer from './DataReducer';
import DeviceReducer from './DeviceReducer';
import GasolinerasReducer from './GasolinerasReducer';

export default combineReducers({
  data: DataReducer,
  devices: DeviceReducer,
  gasolineras: GasolinerasReducer
});
