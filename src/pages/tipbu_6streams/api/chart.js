import moment from 'moment';

const shortMonth = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const data1 = shortMonth.map(m => {
  return {
    'month': m,
    'Line 1': Math.floor(Math.random() * 1000) + 100,
    'Line 2': Math.floor(Math.random() * 1000) + 450,
    'Line 3': Math.floor(Math.random() * 1000) + 200,
    'Bar 1': Math.floor(Math.random() * 1000) + 220,
    'Bar 2': Math.floor(Math.random() * 1000) + 620,
    'Bar 3': Math.floor(Math.random() * 1000) + 120,
  };
});

const data2 = shortMonth.map(m => {
  return {
    'month': m,
    'Bar 1': Math.floor(Math.random() * 1000) + 100,
    'Bar 2': Math.floor(Math.random() * 1000) + 450,
    'Bar 3': Math.floor(Math.random() * 1000) + 200,
    'Bar 4': Math.floor(Math.random() * 1000) + 220,
    'Bar 5': Math.floor(Math.random() * 1000) + 620,
    'Bar 6': Math.floor(Math.random() * 1000) + 120,
    'Bar 7': Math.floor(Math.random() * 1000) + 120,
    'Bar 8': Math.floor(Math.random() * 1000) + 120,
    'Bar 9': Math.floor(Math.random() * 1000) + 120,
  };
});

const date = new Array(30).fill(0).map((el, index) => moment().subtract(30 - index, 'days').format('MM-DD'));

const dailyData1 = date.map(d => {
  return {
    'month': d,
    'Line 1': Math.floor(Math.random() * 1000) + 100,
    'Line 2': Math.floor(Math.random() * 1000) + 450,
    'Line 3': Math.floor(Math.random() * 1000) + 200,
    'Bar 1': Math.floor(Math.random() * 1000) + 220,
    'Bar 2': Math.floor(Math.random() * 1000) + 620,
    'Bar 3': Math.floor(Math.random() * 1000) + 120,
  };
});

const dailyData2 = date.map(d => {
  return {
    'month': d,
    'Run 1': Math.floor(Math.random() * 1000) + 100,
    'Standy 1': Math.floor(Math.random() * 1000) + 450,
    'Error 1': Math.floor(Math.random() * 1000) + 200,
    'Unready 1': Math.floor(Math.random() * 1000) + 220,
    'Run 2': Math.floor(Math.random() * 1000) + 620,
    'Standy 2': Math.floor(Math.random() * 1000) + 120,
    'Error 2': Math.floor(Math.random() * 1000) + 120,
    'Unready 2': Math.floor(Math.random() * 1000) + 120,
    'Run 3': Math.floor(Math.random() * 1000) + 620,
    'Standy 3': Math.floor(Math.random() * 1000) + 120,
    'Error 3': Math.floor(Math.random() * 1000) + 120,
    'Unready 3': Math.floor(Math.random() * 1000) + 120,
  };
});

const dailyCishuShijian = date.map(d => {
  return {
    'date': d,
    '次数': Math.floor(Math.random() * 1000),
    '时间': Math.floor(Math.random() * 100)
  };
});

const cishuByStation = Array(8).fill(0).map((v, index) => {
  return {
    'station': 'Station ' + index,
    '次数': Math.floor(Math.random() * 1000),
    '累计次数(%)': 0
  };
});
const cishuTotal = cishuByStation.reduce((acc, cur) => acc + cur['次数'], 0);
cishuByStation.reduce((acc, cur) => {
  cur['累计次数(%)'] = ((acc + cur['次数']) / cishuTotal) * 100;
  return acc + cur['次数'];
}, 0);

const shijianByStation = Array(8).fill(0).map((v, index) => {
  return {
    'station': 'Station ' + index,
    '时间': Math.floor(Math.random() * 1000 + 10),
    '累计时间(%)': 0
  };
});
const shijianTotal = shijianByStation.reduce((acc, cur) => acc + cur['时间'], 0);
shijianByStation.reduce((acc, cur) => {
  cur['累计时间(%)'] = ((acc + cur['时间']) / shijianTotal) * 100;
  return acc + cur['时间'];
}, 0);
console.log(shijianByStation);
export default {
  data1,
  data2,
  dailyData1,
  dailyData2,
  dailyCishuShijian,
  cishuByStation,
  shijianByStation
};