/*
* 仓库信息 API
*/
import { axios, catchMethod } from './config';
// import { resolve } from 'dns';

// 仓库信息
const warehouses1 = [
  {
    value: 'CDBU',
    label: 'CDBU',
    children: [
      {
        value: 'F21',
        label: 'F21',
        children: [
          {
            value: '3F',
            label: '3F'
          }
        ]
      }
    ]
  },
  {
    value: 'CSPG',
    label: 'CSPG',
    children: [
      {
        value: 'E6',
        label: 'E6',
        children: [
          {
            value: '2F',
            label: '2F'
          },
          {
            value: '3F',
            label: '3F'
          }
        ]
      }
    ]
  },
  {
    value: 'EDVT',
    label: 'EDVT',
    children: [
      {
        value: 'D10',
        label: 'D10',
        children: [
          {
            value: '4F',
            label: '4F'
          }
        ]
      }
    ]
  },
  {
    value: 'ERBU',
    label: 'ERBU',
    children: [
      {
        value: 'F21',
        label: 'F21',
        children: [
          {
            value: '2F',
            label: '2F'
          },
          {
            value: '3F',
            label: '3F'
          },
          {
            value: '4F',
            label: '4F'
          }
        ]
      }
    ]
  },
  {
    value: 'ICT',
    label: 'ICT',
    children: [
      {
        value: 'D10',
        label: 'D10',
        children: [
          {
            value: '4F',
            label: '4F'
          }
        ]
      }
    ]
  },
];
const warehouses = [
  { value: false, id: '01', bu: 'CDBU', building: 'F21', floor: '3F' },
  { value: false, id: '02', bu: 'CSPG', building: 'E6', floor: '2F' },
  { value: false, id: '03', bu: 'CSPG', building: 'E6', floor: '3F' },
  { value: false, id: '04', bu: 'EDVT', building: 'D10', floor: '4F' },
  { value: false, id: '05', bu: 'ERBU', building: 'F21', floor: '2F' },
  { value: false, id: '06', bu: 'ERBU', building: 'F21', floor: '3F' },
  { value: false, id: '07', bu: 'ERBU', building: 'F21', floor: '2F' },
  { value: false, id: '08', bu: 'ICT', building: 'D10', floor: '4F' },
];

const getWarehouseById = (id) => {
  return (id === undefined) ? warehouses[1] : warehouses.find(x => x.id === id);
};

const getWarehouse = (limit) => {
  return (limit) ? warehouses.slice(0, limit) : warehouses;
};

// const getWarehouse1 = (limit) => {
//   return (limit) ? warehouses1.slice(0, limit) : warehouses1;
// };

// 获取服务器数据，或者使用模拟数据
const getWarehouse2 = (params, demo) => {
  if (!demo) {
    return axios.post('good', params).catch(catchMethod);
  } else {
    return new Promise(resolve => {
      resolve({
        status: 200,
        data: warehouses
      });
    });
  }
};

export {
  // getWarehouse1,
  getWarehouseById,
  getWarehouse,
  getWarehouse2
};