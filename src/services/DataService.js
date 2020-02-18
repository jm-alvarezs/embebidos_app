import api from './api';

export default {
  postData: (cmdID, cmdResult, timestamp) =>
    api.post('/data', {cmdID, cmdResult, timestamp}),
};
