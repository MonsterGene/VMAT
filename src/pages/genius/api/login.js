import axios from 'axios';
import { getIpAddress } from './basic';

const demo = true;

function getLogin (username, password) {
  // const ipAddress = getIpAddress();
  return axios.post('http://10.132.45.236/get-gac-authentication/', { 'username': username, 'password': password });
}

export {
  getLogin
};