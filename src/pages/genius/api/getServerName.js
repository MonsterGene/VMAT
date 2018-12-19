import axios from 'axios';
import { getIpAddress } from './basic';

function getServerName () {
  const ipAddress = getIpAddress();
  return axios.get('http://' + ipAddress + '/get-server-name/?format=json');
}

export {
  getServerName
};
