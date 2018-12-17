import moment from 'moment';

const dateList = (startDate, endDate) => {
  startDate = moment(startDate);
  endDate = moment(endDate);

  const daysCount = endDate.diff(startDate, 'days');
  console.log(daysCount);
  return new Array(daysCount).fill(0).map((el, index) => moment().subtract(daysCount - index, 'days').format('YYYY-MM-DD'));
};
const date = dateList(moment().subtract('days', 30).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));

const dailyData1 = date.map(d => {
  return {
    'date': d,
    'Rate 1': Math.floor(Math.random() * 1000) + 100,
    'Rate 2': Math.floor(Math.random() * 1000) + 450,
    'Rate 3': Math.floor(Math.random() * 1000) + 200,
    'Num 1': Math.floor(Math.random() * 1000) + 220,
    'Num 2': Math.floor(Math.random() * 1000) + 620,
    'Num 3': Math.floor(Math.random() * 1000) + 120,
  };
});

const dailyData2 = (startDate, endDate) => {
  return dateList(startDate, endDate).map(d => {
    return {
      'date': d,
      'Run 1': Math.floor(Math.random() * 1000) + 100,
      'Standy 1': Math.floor(Math.random() * 1000) + 450,
      'Error 1': Math.floor(Math.random() * 1000) + 200,
      'Unready 1': Math.floor(Math.random() * 1000) + 220,
      // 'Run 2': Math.floor(Math.random() * 1000) + 620,
      // 'Standy 2': Math.floor(Math.random() * 1000) + 120,
      // 'Error 2': Math.floor(Math.random() * 1000) + 120,
      // 'Unready 2': Math.floor(Math.random() * 1000) + 120,
      // 'Run 3': Math.floor(Math.random() * 1000) + 620,
      // 'Standy 3': Math.floor(Math.random() * 1000) + 120,
      // 'Error 3': Math.floor(Math.random() * 1000) + 120,
      // 'Unready 3': Math.floor(Math.random() * 1000) + 120,
    };
  });
};

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

const stateLegends = [
  { state: '正常', stateCode: '', color: 'green' },
  { state: '待机', stateCode: '', color: 'orange' },
  { state: '异常', stateCode: '', color: 'red' },
  { state: '断网', stateCode: '', color: 'grey' },
  { state: '关机', stateCode: '', color: 'black' }
];

const stationImgConf = {};
stationImgConf['入前盖'] = 
stationImgConf['锁螺丝'] = require('../static/pic/station_001.png');
stationImgConf['装导航键'] = require('../static/pic/station_002.png');
stationImgConf.default = 
stationImgConf['入支架'] = 
stationImgConf['装LCD'] = 
stationImgConf['锁面板'] = require('../static/pic/station_003.png');
stationImgConf['装灯罩&小卡'] = require('../static/pic/station_004.png');
stationImgConf.stationConnection = require('../static/pic/station_connection.png');

const stationList = [
  '前盖入料机',
  '入前盖',
  '取保护板',
  '装LCD',
  '锁LCD螺丝', '锁主板螺丝1', '锁主板螺丝2', '锁主板螺丝3', '锁后盖螺丝', '锁面板螺丝',
  '装导航键',
  '装灯罩&小卡',
  '贴Label'
].map(name => {
  return { name: name, img: stationImgConf[name] || stationImgConf.default, state: stateLegends[Math.floor(Math.random() * 100) % 4].state, output: Math.floor(Math.random() * 1000) + 12 };
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
  shijianByHour,
  stateLegends,
  stationImgConf,
  stationList
};