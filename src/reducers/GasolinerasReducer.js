import { GASOLINERAS_RECIBIDAS } from "../actions/types"

const initialState = {
    gasolineras: null
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case GASOLINERAS_RECIBIDAS:
        return { ...state, gasolineras: payload };
    default:
        return state
    }
}
