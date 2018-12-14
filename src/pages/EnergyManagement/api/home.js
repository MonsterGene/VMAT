import { axios, catchMethod } from './config';

/** 获取首页第一张图数据 */
const homeFistChart = params => {
  /** 
   * params: { startTime: Date, endTime:Date, building: String, [bu: String] }
   */
  return axios.post('/get/building/epnet', params).catch(catchMethod);
};

export default {
  homeFistChart
};