import {APPEND_PROPERTY_VALUE, SET_PROPERTY_VALUE} from '../actions/types';

const INITIAL_STATE = {
  data: {
    VIN: null,
    ENGINE_LOAD: [],
    ENGINE_RPM: [],
    FUEL_LEVEL: [],
    MAF: [],
    THROTTLE_POSITION: [],
    FUEL_CONSUMPTION_RATE: [],
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
              time: new Date().toISOString(),
            });
          }
        }
      }
      return {...state, data};
    case SET_PROPERTY_VALUE:
      const datos = {...state.data};
      datos[action.payload.cmdID] = action.payload.cmdResult;
      return {...state, data: datos};
    default:
      return {...state};
  }
};
