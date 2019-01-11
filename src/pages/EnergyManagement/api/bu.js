import { axios, catchMethod } from './config';

const chart1Data = params => {
  return axios.post('/get/building/bu/type', params).catch(catchMethod);
  // const chart1Data = function () {
  //   return {
  //     building: ['D9', 'D10', 'E5', 'E6', 'F12'],
  //     '生产': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
  //     '照明': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
  //     '空调': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250)
  //   };
  // };
};

const tableData = (params, demo) => {
  if (!demo) {
    return axios.post('/get/meter/detail', params).catch(catchMethod);
  }
};

export default {
  chart1Data,
  tableData
};