import axios from 'axios';
import { getIpAddress } from './basic';

function getNotifyMarquee () {
  const ipAddress = getIpAddress();
  return axios.get('http://' + ipAddress + '/get-notification/');
}

function setNotifyMarquee (notify) {
  const ipAddress = getIpAddress();
  return axios.post('http://' + ipAddress + '/set-notification/', { 'notification': notify });
}

export {
  getNotifyMarquee,
  setNotifyMarquee
};
