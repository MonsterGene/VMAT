import { axios, catchMethod } from './config';

/** 产出数据 */
const getStationOutput = {
  /**
   * params: { start_date: Date, end_date: Date, line_id: Int, area_id: Int }
   */
  byDay: (params) => {
    return axios.post('/GetOutput/getOutputByDay', params).catch(catchMethod);
  },
  /**
   * params: { date: Date, line_id: Int, area_id: Int }
   */
  byHour: (params) => {
    return axios.post('/GetOutput/getOutputByHour', params).catch(catchMethod);
  }
};

/** 稼动率数据 */
const getUtilizationRate = {
  /**
   * params: { start_date: Date, end_date: Date, line_id: Int, area_id: Int }
   */
  byDay: (params) => {

  },
  /**
   * params: { date: Date, line_id: Int, area_id: Int }
   */
  byHour: (params) => {

  }
};

/** 
 * 异常次数&时间
 * params: {startDate: Date, endDate: Date, areaid: Int, lineid: Int}
 */
const getErrorFrequencyAndTime = (params) => {
  return axios.post('/GetAlertMessage/GetAlertByDay', params).catch(catchMethod);
};

export default {
  getStationOutput,
  getUtilizationRate,
  getErrorFrequencyAndTime
};