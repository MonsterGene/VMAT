import moment from 'moment';

const date = new Array(30).fill(0).map((el, index) => moment().subtract(30 - index, 'days').format('MM-DD'));

const barChart1 = date.map(d => {
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

export default barChart1;