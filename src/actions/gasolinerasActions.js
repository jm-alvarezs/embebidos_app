import GasolinerasService from "../services/GasolinerasService";
import { GASOLINERAS_RECIBIDAS } from "./types";

export const getGasolineras = (VIN, limit, offset) => dispatch => {
    GasolinerasService.getGasolineras(VIN, limit, offset).then(res => {
        const gasolineras = res.data;
        console.log(gasolineras);
        dispatch({ type: GASOLINERAS_RECIBIDAS, payload: gasolineras });
    }).catch(error => {
        console.log(error);
    });
};