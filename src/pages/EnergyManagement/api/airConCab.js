import { axios, catchMethod } from './config';

const homeFistChart = params => {
  /** 
   * params: { startTime: Date, endTime:Date, building: String, [bu: String] }
   */
  return axios.post('/get/building/epnet', params).catch(catchMethod);
};

export default {
  homeFistChart
};