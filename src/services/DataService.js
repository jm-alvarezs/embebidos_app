import api from './api';

export default {
  postData: (VIN, cmdID, cmdResult, timestamp) =>
    api.post('/datos', {VIN, cmdID, cmdResult, timestamp}),
};
