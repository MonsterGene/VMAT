// 仓库总信息

// bu信息
const bus = [
  '815', 'CDBU', 'CSPG', 'CVEBU', 'CVTG',  
  'EDVT', 'ERBU', 'FTX', 'ICT', 'MKD', 'MTP', 'NWE', 
  'PABU', 'RCFA', 'SCBU', 'SERE', 'SFPG', 'SRG', 'TIPBU',
  'UABU', 'UCEBU', 'UAG', 'UCEBU', 'WNG&IoTG', 'WSTG'
];

// 楼栋信息
const buildings = [
  'D9', 'D10', 'E5', 'E6', 'F21', 'MKD'
];

// 楼层信息
const floors = [
  '1F', '1.5F', '2F', '3F', '4F'
];

// 仓库信息
const warehouses = [
  { bu: '815', building: 'D9', floor: '1F' },
  { bu: '815', building: 'E5', floor: '2F' },
  { bu: 'CDBU', building: 'D9', floor: '2F' },
];

const getBU = (limit) => {
  return (limit) ? bus.slice(0, limit) : bus;
};

const getBuilding = (limit) => {
  return (limit) ? buildings.slice(0, limit) : buildings;
};

const getFloor = (limit) => {
  return (limit) ? floors.slice(0, limit) : floors;
};

const getWarehouse = (limit) => {
  return (limit) ? warehouses.slice(0, limit) : warehouses;
};

export {
  getBU,
  getBuilding,
  getFloor,
  getWarehouse
};