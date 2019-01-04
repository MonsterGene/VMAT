import { axios, catchMethod } from './config';

const postApply = (params) => {
  return axios.post('materials/add', params).catch(catchMethod);
};

// const getLinesData = () => {
//   return axios.post('/LineConfig/GetLineData').catch(catchMethod);
// };

export default {
  postApply,
  // getLinesData
};