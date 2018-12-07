import axios from 'axios';
import { getIpAddress } from './basic';

function getGeniusVersion () {
  const ipAddress = getIpAddress();
  return axios.get('http://' + ipAddress + '/get-current-version/?format=json');
}

export {
  getGeniusVersion
};
