import axios from 'axios';

function getIpAddress () {
  let hostname = window.location.hash.split('=')[1];
  if (!hostname) { 
    hostname = window.location.hostname;
  }
  // console.log(hostname);
  // hostname = '192.168.78.145';
  return hostname + ':8000';
}

export {
  getIpAddress
};