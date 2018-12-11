import axios from 'axios';

function getAdvanced (params) {
  const currentUrl = window.location.hash;
  const hostname = window.location.hostname;
  if (hostname.includes('localhost')) {
    return axios.post('http://localhost:8000/get_yield_throughput/',
      { 'data_type': params.data_type, 'start_date': params.start_date, 'end_date': params.end_date, 'uuttype': params.uuttype, 'sernum': params.sernum, 'area': params.area, 'machine': params.machine, 'mode': params.mode, 'result': params.result, 'test': params.test, 'database': '192.168.75.128' });
  }
  if (currentUrl.includes('fortinet')) {
    console.log('it is fortinet');
    return axios.post('http://10.132.45.164:8000/get_yield_throughput/',
      { 'data_type': params.data_type, 'start_date': params.start_date, 'end_date': params.end_date, 'uuttype': params.uuttype, 'sernum': params.sernum, 'area': params.area, 'machine': params.machine, 'mode': params.mode, 'result': params.result, 'test': params.test, 'database': '10.167.6.165' });
  } else {
    console.log('it is Vistion');
    return axios.post('http://10.132.45.164:8000/get_yield_throughput/',
      { 'data_type': params.data_type, 'start_date': params.start_date, 'end_date': params.end_date, 'uuttype': params.uuttype, 'sernum': params.sernum, 'area': params.area, 'machine': params.machine, 'mode': params.mode, 'result': params.result, 'test': params.test, 'database': '192.168.200.214' });
  }
}


function getAnalysis (params) {
  const currentUrl = window.location.hash;
  const hostname = window.location.hostname;
  if (hostname.includes('localhost')) {
    return axios.post('http://localhost:8000/get-failure-analysis/',
      { 'data_type': params.data_type, 'start_date': params.start_date, 'end_date': params.end_date, 'uuttype': params.uuttype, 'sernum': params.sernum, 'area': params.area, 'machine': params.machine, 'mode': params.mode, 'result': params.result, 'test': params.test, 'database': '192.168.75.128' });
  }
  if (currentUrl.includes('fortinet')) {
    console.log('it is fortinet');
    return axios.post('http://10.132.45.164:8000/get-failure-analysis/',
      { 'data_type': params.data_type, 'start_date': params.start_date, 'end_date': params.end_date, 'uuttype': params.uuttype, 'sernum': params.sernum, 'area': params.area, 'machine': params.machine, 'mode': params.mode, 'result': params.result, 'test': params.test, 'database': '10.167.6.165' });
  } else {
    console.log('it is Vistion');
    return axios.post('http://10.132.45.164:8000/get-failure-analysis/',
      { 'data_type': params.data_type, 'start_date': params.start_date, 'end_date': params.end_date, 'uuttype': params.uuttype, 'sernum': params.sernum, 'area': params.area, 'machine': params.machine, 'mode': params.mode, 'result': params.result, 'test': params.test, 'database': '192.168.200.214' });
  }
}

export {
  getAdvanced,
  getAnalysis
};