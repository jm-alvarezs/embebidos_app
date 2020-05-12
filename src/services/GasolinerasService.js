import api from "./api";

const route = "/gasolineras";

export default {
    getGasolineras: (VIN, limit, offset) => api.get(`${route}/FUEL_LEVEL/${VIN}?limit=${limit}&offset=${offset}`)
}