import moment from 'moment';

const dateList = n => new Array(n).fill(0).map((el, index) => moment().subtract(n - index, 'days').format('MM-DD'));

const barChartDataWeek = dateList(7).map(d => {
  return {
    'date': d,
    'Num 1': Math.floor(Math.random() * 1000) + 220,
  };
});

const pieChartDataWeek = ['生产', '照明', '空调'].map(d => ({
  '即时通讯工具': d,
  value: Math.floor(Math.random() * 1000) + 220
}));

export default {
  barChartDataWeek,
  pieChartDataWeek
};