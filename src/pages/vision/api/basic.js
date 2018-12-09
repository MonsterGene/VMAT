import axios from 'axios';

function getBasic (sernum) {
  const currentUrl = window.location.hash;
  const hostname = window.location.hostname;
  if (hostname.includes('localhost')) {
    return axios.post('http://localhost:8000/get-record-by-sernum/', { 'sernum': sernum, 'database': '192.168.75.128' });  // laptop VM
  }
  if (currentUrl.includes('fortinet')) {
    console.log('it is Fortinet');
    return axios.post('http://10.132.45.164:8000/get-record-by-sernum/', { 'sernum': sernum, 'database': '10.167.6.165' });  // fortinet
  } else {
    console.log('it is Vision');
    return axios.post('http://10.132.45.164:8000/get-record-by-sernum/', { 'sernum': sernum, 'database': '192.168.200.214' }); // Genius
  }
}

export {
  getBasic
};