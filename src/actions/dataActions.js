import {APPEND_PROPERTY_VALUE} from './types';
import DataService from '../services/DataService';

export const appendData = data => {
  DataService.postData(
    data.cmdID,
    data.cmdResult,
    new Date().toISOString(),
  ).catch(e => console.log(e));
  //dispatch({type: APPEND_PROPERTY_VALUE, payload: data});
};
