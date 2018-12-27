import { axios, catchMethod } from './config';

const homeFistChart = params => {
  /** 
   * params: { startTime: Date, endTime:Date, building: String, [bu: String] }
   */
  return axios.post('/get/air/host', params).catch(catchMethod);
};
const chart1Data = function () {
  return {
    date: ['12月1日', '12月6日', '12月11日', '12月16日', '12月21日', '12月26日', '12月31日'],
    '能耗': Array(7).fill(0).map(val => Math.floor(Math.random() * 1000) + 250)
  };
};

export default {
  homeFistChart,
  chart1Data
};