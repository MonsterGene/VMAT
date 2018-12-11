import { axios, catchMethod } from './config';

const getBu = () => {
  return axios.post('/overview/').catch(catchMethod);
};

// const getLinesData = () => {
//   return axios.post('/LineConfig/GetLineData').catch(catchMethod);
// };

export default {
  getBu,
  // getLinesData
};