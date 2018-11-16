import moment from 'moment';

const date = new Array(30).fill(0).map((el, index) => moment().subtract(30 - index, 'days').format('MM-DD'));

const dailyData1 = date.map(d => {
  return {
    'month': d,
    'Rate 1': Math.floor(Math.random() * 1000) + 100,
    'Rate 2': Math.floor(Math.random() * 1000) + 450,
    'Rate 3': Math.floor(Math.random() * 1000) + 200,
    'Num 1': Math.floor(Math.random() * 1000) + 220,
    'Num 2': Math.floor(Math.random() * 1000) + 620,
    'Num 3': Math.floor(Math.random() * 1000) + 120,
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
}).sort((a, b) => b.次数 - a.次数);
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
}).sort((a, b) => b.时间 - a.时间);
const shijianTotal = shijianByStation.reduce((acc, cur) => acc + cur['时间'], 0);
shijianByStation.reduce((acc, cur) => {
  cur['累计时间(%)'] = ((acc + cur['时间']) / shijianTotal) * 100;
  return acc + cur['时间'];
}, 0);
const shijianByType = Array(8).fill(0).map((val, index) => {
  return {
    type: 'Error' + index,
    '时间(min)': Math.floor(Math.random() * 1000) + 12
  };
});
const shijianByDay = Array(7).fill(0).map((val, index) => {
  return {
    date: moment().subtract(7 - index, 'days').format('MM-DD'),
    '时间(min)': Math.floor(Math.random() * 1000) + 12
  };
});
const shijianByHour = Array(24).fill(0).map((val, index) => {
  return {
    hour: moment().subtract(24 - index, 'hours').format('HH:mm'),
    '时间(min)': Math.floor(Math.random() * 1000) + 12
  };
});

const cishuByType = Array(8).fill(0).map((val, index) => {
  return {
    type: 'Error' + index,
    '次数': Math.floor(Math.random() * 1000) + 12
  };
});
const cishuByDay = Array(7).fill(0).map((val, index) => {
  return {
    date: moment().subtract(7 - index, 'days').format('MM-DD'),
    '次数': Math.floor(Math.random() * 1000) + 12
  };
});
const cishuByHour = Array(24).fill(0).map((val, index) => {
  return {
    hour: moment().subtract(24 - index, 'hours').format('HH:mm'),
    '次数': Math.floor(Math.random() * 1000) + 12
  };
});

export default {
  dailyData1,
  dailyData2,
  hoursData,
  dailyCishuShijian,
  cishuByStation,
  cishuByType,
  cishuByDay,
  cishuByHour,
  shijianByStation,
  shijianByType,
  shijianByDay,
  shijianByHour
};