import {SET_DEVICE} from '../actions/types';

const INITIAL_STATE = {
  device: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DEVICE:
      return {...state, device: action.payload};
    default:
      return {...state};
  }
};
