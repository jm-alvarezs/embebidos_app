import {APPEND_PROPERTY_VALUE, SET_PROPERTY_VALUE} from './types';
import DataService from '../services/DataService';

export const appendData = (VIN, data) => dispatch => {
  if (data.cmdResult !== null && VIN !== null && data.cmdID !== 'VIN') {
    DataService.postData(
      data.cmdID,
      data.cmdResult,
      new Date().toISOString(),
    ).catch(e => console.log(e));
    dispatch({type: APPEND_PROPERTY_VALUE, payload: data});
  } else if (data.cmdID === 'VIN') {
    dispatch({type: SET_PROPERTY_VALUE, payload: data});
  }
};
