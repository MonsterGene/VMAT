import { axios, catchMethod } from './config';

const getForm = () => {
  return axios.post('form').catch(catchMethod);
};

export default {
  getForm
};