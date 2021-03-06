import { axios, catchMethod } from './config';

const getStateLegends = () => {
  return axios.post('/LineConfig/GetState').catch(catchMethod);
};
const getLinesData = () => {
  return axios.post('/LineConfig/GetLineData').catch(catchMethod);
};

const getErrorFrequencyByStation = (params) => {
  return axios.post('/LineConfig/getLineAlertCount', params).catch(catchMethod);
};

const getErrorTimeByStation = (params) => {
  return axios.post('/LineConfig/getLineAlertDate', params).catch(catchMethod);
};

const getTestLinesData = () => {
  return axios.post('http://localhost:9000/api/test').catch(catchMethod);
};

export default {
  getStateLegends,
  getLinesData,
  getErrorFrequencyByStation,
  getErrorTimeByStation,
  getTestLinesData
};