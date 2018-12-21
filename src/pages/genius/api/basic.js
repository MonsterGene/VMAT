import axios from 'axios';

function getIpAddress () {
  let hostname = window.location.hash.split('=')[1];
  if (!hostname) { 
    hostname = window.location.hostname;
  }
  // console.log(hostname);
  // hostname = '192.168.75.128';
  // hostname = '10.167.192.122';
  return hostname + ':8000';
}

export {
  getIpAddress
};
