import axios from 'axios';
import { serverAddr } from './config';

axios.defaults.baseURL = serverAddr;

const responseMethod = function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

const getStateLegends = () => {
  return axios.post('/LineConfig/GetState').catch(responseMethod);
};

const getLinesData = () => {
  return axios.post('/LineConfig/GetLineData').catch(responseMethod);
};

export default {
  getStateLegends,
  getLinesData
};