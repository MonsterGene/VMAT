import axios from 'axios';
import { getIpAddress } from './basic';

function getTestLog (connection_name) {
  const ipAddress = getIpAddress();
  return axios.get('http://' + ipAddress + '/get-test-log/?connection=' + connection_name);
}

export {
  getTestLog
};
