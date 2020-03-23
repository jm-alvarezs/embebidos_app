import {
  APPEND_PROPERTY_VALUE,
  SET_PROPERTY_VALUE,
  CARGA_REGISTRADA,
  STOP_DATA,
  RESET_CMD,
} from './types';
import DataService from '../services/DataService';
import CargaService from '../services/CargaService';

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

export const postData = (VIN, data) => dispatch => {
  let filtered = data.map(cmd => ({
    ...cmd,
    cmdResult: parseInt(cmd.cmdResult.replace(/^d/g, '')),
  }));
  if (filtered.length === 0) return;
  let average = filtered.reduce((a, b) => a + b) / filtered.length;
  if (isNaN(average)) return;
  DataService.postData(
    VIN,
    data.cmdID,
    average,
    new Date().toUTCString(),
  ).catch(e => console.log(e));
  dispatch({type: RESET_CMD, payload: data[0].cmdID});
};

export const postCarga = (VIN, latitud, longitud) => dispatch => {
  console.log(VIN, latitud, longitud);
  CargaService.postCarga(VIN, new Date().toUTCString(), latitud, longitud)
    .then(res => {
      dispatch({type: CARGA_REGISTRADA});
    })
    .catch(error => {
      console.log(error);
    });
};
