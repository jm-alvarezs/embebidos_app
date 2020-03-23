import api from './api';

const route = '/cargas';

export default {
  postCarga: (VIN, fecha_hora, latitud, longitud) =>
    api.post(route, {VIN, fecha_hora, latitud, longitud}),
};
