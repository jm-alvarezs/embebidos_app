import {
  APPEND_PROPERTY_VALUE,
  SET_PROPERTY_VALUE,
  STOP_DATA,
  RESET_CMD,
} from '../actions/types';
import moment from 'moment';

const INITIAL_STATE = {
  data: {
    VIN: null,
    ENGINE_RPM: [],
    FUEL_LEVEL: [],
    FUEL_CONSUMPTION_RATE: [],
    ENGINE_COOLANT_TEMP: [],
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_PROPERTY_VALUE:
      const data = {...state.data};
      const obj = action.payload;
      if (obj) {
        if (obj.cmdID !== 'VIN') {
          if (data[obj.cmdID]) {
            data[obj.cmdID].push({
              cmdResult: obj.cmdResult,
              time: moment().utc(),
            });
          }
        }
      }
      return {...state, data};
    case SET_PROPERTY_VALUE:
      const datos = {...state.data};
      datos[action.payload.cmdID] = action.payload.cmdResult;
      return {...state, data: datos};
    case STOP_DATA:
      return {
        ...INITIAL_STATE,
        data: {...INITIAL_STATE.data, VIN: state.data.VIN},
      };
    case RESET_CMD:
      let cmdID = action.payload;
      let allData = {...state.data};
      allData[cmdID] = [];
      return {...state, data: allData};
    default:
      return {...state};
  }
};
