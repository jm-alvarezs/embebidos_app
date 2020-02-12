import {APPEND_PROPERTY_VALUE} from './types';

export const appendPropertyValue = (property, value) => dispatch => {
  dispatch({type: APPEND_PROPERTY_VALUE, payload: {property, value}});
};
