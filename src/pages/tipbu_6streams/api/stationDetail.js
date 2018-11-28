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

export default {
  getStationOutput,
  getUtilizationRate
};