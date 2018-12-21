import { axios, catchMethod } from './config';

const getStateLegends = () => {
  return axios.post('/LineConfig/GetState').catch(catchMethod);
};

const getLinesData = () => {
  return axios.post('/LineConfig/GetLineData').catch(catchMethod);
};

/** 产出数据 */
const getStationOutputByDay =  (params) => {
  return axios.post('/GetOutput/getOutputByDay', params).catch(catchMethod);
};

export default {
  getStateLegends,
  getLinesData,
  getStationOutputByDay
};