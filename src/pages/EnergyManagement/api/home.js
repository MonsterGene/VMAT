import { axios, catchMethod } from './config';

/** 获取首页第一张图数据 */
const homeFistChart = params => {
  /** 
   * params: { startTime: Date, endTime:Date, building: String, [bu: String] }
   */
  return axios.post('/get/building/epnet', params).catch(catchMethod);
};

// 各楼栋电能消耗
const chart1Data = params => {
  return axios.post('/get/each/building/epnet', params).catch(catchMethod);
  // building: ['D9', 'D10', 'E5', 'E6', 'F12'],
  // '生产': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
  // '照明': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
  // '空调': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250)
};
// const chart1Data = function () {
//   return {
//     building: ['D9', 'D10', 'E5', 'E6', 'F12'],
//     '生产': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
//     '照明': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
//     '空调': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250)
//   };
// };


const chart3Data = params => {
  return axios.post('/get/each/bu/epnet', params).catch(catchMethod);
  // building: ['D9', 'D10', 'E5', 'E6', 'F12'],
  // 'BU': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250)
};
const chart5Data = params => {
  return axios.post('/get/powerTrend', params).catch(catchMethod);
};

export default {
  homeFistChart,
  chart1Data,
  chart3Data,
  chart5Data
};