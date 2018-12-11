import { axios, catchMethod } from './config';

const getStateLegends = () => {
  return axios.post('/LineConfig/GetState').catch(catchMethod);
};
const getLinesData = () => {
  return axios.post('/LineConfig/GetLineData').catch(catchMethod);
};


export default {
  getStateLegends,
  getLinesData
};