/*
* API 导入导出
*/

import demoApi from './demoApi';
import pageApi from './pageApi';
import Chart from './chart';
import formApi from './form';

const getMonthVisit = Chart.monthVisitData;
const getLocation = Chart.locationData;
export {
  demoApi,
  pageApi,
  getMonthVisit,
  getLocation,
  formApi
};