import { axios, catchMethod } from './config';

const homeFistChart = params => {
  /** 
   * params: { startTime: Date, endTime:Date, building: String, [bu: String] }
   */
  return axios.post('/get/air/cabinet', params).catch(catchMethod);
};
const AirConCabVIPFTrend = (params) => {
  return axios.post('/get/air/cabinet/detail', params).catch(catchMethod);
};

export default {
  homeFistChart,
  AirConCabVIPFTrend
};