import { axios, catchMethod } from './config';

const chart1Data = params => {
  return axios.post('/get/floor/all', params).catch(catchMethod);
  // building: ['D9', 'D10', 'E5', 'E6', 'F12'],
  // '生产': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
  // '照明': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
  // '空调': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250)
};

const buildingTypeEnergy = (params, demo) => {
  if (!demo) {
    return axios.post('/get/building/epnet', params).catch(catchMethod);
  } else {
    return new Promise((res) => {
      res({
        '类型': ['生产', '照明', '空调主机', '空调风柜'],
        '能耗': Array(4).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
      });
    });
  }
};

export default {
  chart1Data,
  buildingTypeEnergy
};