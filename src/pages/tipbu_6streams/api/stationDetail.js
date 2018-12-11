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

/**
 * 异常类型次数
 * params: {startDate: Date, endDate: Date, lineID: Int, areaID: Int}
 */
const getErrorFrequency = {
  byType: params => {
    return axios.post('/GetAlertMessage/GetErrorTypeCount', params).catch(catchMethod);
  },
  byDay: params => {
    return axios.post('/GetAlertMessage/GetAlertDayDataByType', params).catch(catchMethod);
  },
  byHour: params => {
    return axios.post('/GetAlertMessage/GetAlertHourDataByType', params).catch(catchMethod);    
  }
};

/**
 * 异常类型时间
 * params: {startDate: Date, endDate: Date, lineID: Int, areaID: Int}
 */
const getErrorTime = {
  byType: params => {
    return axios.post('/GetAlertMessage/GetErrorTypeDate', params).catch(catchMethod);
  }
};

/**
 * 异常解决方案
 */
const errorSolution = {
  fetch: params => {
    /**
     * params: { areaID: Int, errorType: String }
     */
    return axios.post('/AlertConfig/getAlertSolution', params).catch(catchMethod);
  },
  edit: params => {
    /**
     * params: { areaID: Int, code: String, info: String, rootCourse: String, action: String }
     */
    return axios.post('/AlertConfig/updateAlertMessage', params).catch(catchMethod);
  }
};

export default {
  getStationOutput,
  getUtilizationRate,
  getErrorFrequencyAndTime,
  getErrorFrequency,
  getErrorTime,
  errorSolution
};