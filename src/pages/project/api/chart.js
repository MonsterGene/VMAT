import axios from 'axios';
const shortMonth = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const demo_monthVisitData = shortMonth.map(m => {
  return {
    'month': m,
    'Unique Visit': Math.floor(Math.random() * 1000) + 200,
    'Page View': Math.floor(Math.random() * 1000) + 250,
  };
});
const monthVisitDataApiUrl = null;
const monthVisitData = () => {
  if (monthVisitDataApiUrl) {
    return axios.get(monthVisitDataApiUrl);
  } else {
    return { data: demo_monthVisitData };
  }
};

const demo_locationData = [
  {
    value: 50,
    name: 'China'
  },
  {
    value: 35,
    name: 'USA'
  },
  {
    value: 25,
    name: 'EU'
  },
  {
    value: 10,
    name: 'Russia'
  },
  {
    value: 10,
    name: 'Other'
  }
];
const locationDataApiUrl = null;
const locationData = () => {
  if (locationDataApiUrl) {
    return axios.get(locationDataApiUrl);
  } else {
    return { data: demo_locationData };
  }
};

export {
  monthVisitData,
  locationData
};