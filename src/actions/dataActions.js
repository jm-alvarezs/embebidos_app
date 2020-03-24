import {
  APPEND_PROPERTY_VALUE,
  SET_PROPERTY_VALUE,
  CARGA_REGISTRADA,
  STOP_DATA,
  RESET_CMD,
} from './types';
import DataService from '../services/DataService';
import CargaService from '../services/CargaService';
import moment from 'moment';

export const appendData = (VIN, data) => dispatch => {
  if (data) {
    if (data.cmdResult !== null && VIN !== null && data.cmdID !== 'VIN') {
      dispatch({type: APPEND_PROPERTY_VALUE, payload: data});
    } else if (data.cmdID === 'VIN' && data.cmdResult !== null) {
      dispatch({type: SET_PROPERTY_VALUE, payload: data});
    }
  } else {
    dispatch({
      type: SET_PROPERTY_VALUE,
      payload: {cmdID: 'VIN', cmdResult: VIN},
    });
  }
};

export const stopLiveData = () => dispatch => {
  dispatch({type: STOP_DATA});
};

export const postData = (VIN, cmdID, data) => dispatch => {
  let filtered = data.map(cmd => ({
    ...cmd,
    cmdResult: Number(cmd.cmdResult.replace(/^d/g, '')),
  }));
  if (filtered.length === 0) return;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < filtered.length; i++) {
    let {cmdResult} = filtered[i];
    if (cmdResult > 0) {
      sum += cmdResult;
      count++;
    }
  }
  if (count > 0) {
    let average = sum / count;
    if (isNaN(average)) return;
    DataService.postData(VIN, cmdID, average, moment().utc()).catch(e =>
      console.log(e),
    );
    dispatch({type: RESET_CMD, payload: data[0].cmdID});
  }
};

export const postCarga = (VIN, latitud, longitud) => dispatch => {
  CargaService.postCarga(VIN, moment().utc(), latitud, longitud)
    .then(res => {
      dispatch({type: CARGA_REGISTRADA});
    })
    .catch(error => {
      console.log(error);
    });
};
