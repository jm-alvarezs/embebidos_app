import {SET_DEVICE} from './types';

export const getDevices = () => dispatch => {};

export const setDevice = device => dispatch => {
  dispatch({type: SET_DEVICE, payload: device});
};
