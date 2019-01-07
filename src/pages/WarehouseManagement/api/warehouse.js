// 仓库总信息



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
  { bu: 'CDBU', building: 'F21', floor: '3F' },
  { bu: 'CSPG', building: 'E6', floor: '2F' },
  { bu: 'CSPG', building: 'E6', floor: '3F' },
  { bu: 'EDVT', building: 'D10', floor: '4F' },
  { bu: 'ERBU', building: 'F21', floor: '2F' },
  { bu: 'ERBU', building: 'F21', floor: '3F' },
  { bu: 'ERBU', building: 'F21', floor: '2F' },
  { bu: 'ICT', building: 'D10', floor: '4F' },
];

const getWarehouse = (limit) => {
  return (limit) ? warehouses.slice(0, limit) : warehouses;
};

const getWarehouse1 = (limit) => {
  return (limit) ? warehouses1.slice(0, limit) : warehouses1;
};

export {
  getWarehouse1,
  getWarehouse
};