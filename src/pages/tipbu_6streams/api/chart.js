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

export {
  data1,
  data2,
};