import moment from 'moment';

const date = new Array(30).fill(0).map((el, index) => moment().subtract(30 - index, 'days').format('MM-DD'));

const hoursData = new Array(24).fill(
  moment().hours() < 8 ?
    moment().subtract(1, 'days').format('YYYY-MM-DD 08:00:00') :
    moment().format('YYYY-MM-DD 08:00:00')
).map((val, index) => {
  return {
    hours: moment(val).add(index, 'hours').format('HH:mm'),
    'Rate 1': Math.floor(Math.random() * 1000) + 100,
    'Rate 2': Math.floor(Math.random() * 1000) + 450,
    'Rate 3': Math.floor(Math.random() * 1000) + 200,
    'Num 1': Math.floor(Math.random() * 1000) + 220,
    'Num 2': Math.floor(Math.random() * 1000) + 620,
    'Num 3': Math.floor(Math.random() * 1000) + 120,
  };
});
const wipChart2 = {
  'product': ['2018-11-22', '2018-11-23', '2018-11-24', '2018-11-25', '2018-11-26', '2018-11-27', '2018-11-28', '2018-11-29'],
  'Defectinput': [332, 254, 269, 78, 270, 310, 259, 164],
  'Yield': ['93.6', '96.1', '96.2', '92.3', '95.3', '96.4', '95.3', '98.8']
};

const wipChart1 = {
  'product': ['2018-11-22', '2018-11-23', '2018-11-24', '2018-11-25', '2018-11-26', '2018-11-27', '2018-11-28', '2018-11-29'],
  'ICT Input': [823, 235, 1042, 988, 116, 122, 158, 452],
  'FT Input': [95.8, 81.4, 91.2, 76.9, 45.4, 14.4, 45.5, 98.2],
  'ICT Output': [895, 458, 152, 589, 236, 485, 526, 455, 785],
  'FT Output': [11, 15, 19, 85, 45, 45, 89, 45, 45],
  'Total WIP': [541, 458, 456, 458, 125, 453, 568, 485],
  'Target': [154, 478, 458, 152, 465, 598, 451, 458]
};


const bingtu = null;

export default {
  hoursData,
  wipChart1,
  wipChart2,
  bingtu
};