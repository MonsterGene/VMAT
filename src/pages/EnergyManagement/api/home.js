import { axios, catchMethod } from './config';

/**
 * 首页仪表盘数据
 * @param {object} params
 * @param {Date} params.startTime - 开始时间
 * @param {Date} params.endTime - 结束时间
 * @param {String} params.building - 楼栋
 * @param {String} params.bu - bu， 可选
 */
const homeFistChart = params => {
  return axios.post('/get/building/epnet', params).catch(catchMethod);
};

/**
 * 各楼栋电能消耗
 * @param {object} params
 * @param {boolean} demo
 *  */
const chart1Data = (params, demo) => {
  if (!demo) {
    return axios.post('/get/each/building/epnet', params).catch(catchMethod);
  } else {
    return new Promise((res, rej) => {
      res({
        building: ['D9', 'D10', 'E5', 'E6', 'F12'],
        '生产': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
        '照明': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
        '空调主机': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250),
        '空调风柜': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250)
      });
    });
  }
};

/**
 * By BU 累计电能能耗
 * @param {object} params
 * @param {boolean} demo
 */
const chart3Data = (params, demo) => {
  if (!demo) {
    return axios.post('/get/each/bu/epnet', params).catch(catchMethod);
  } else {
    return new Promise(res => {
      res({
        BU: ['BU1', 'BU2', 'BU3', 'BU4', 'BU5'],
        '能耗': Array(5).fill(0).map(val => Math.floor(Math.random() * 1000) + 250)
      });
    });
  }
};

/**
 * 单位耗电趋势By Day
 * @param {object} params 
 */
const chart5Data = params => {
  return axios.post('/get/powerTrend', params).catch(catchMethod);
};

export default {
  homeFistChart,
  chart1Data,
  chart3Data,
  chart5Data
};