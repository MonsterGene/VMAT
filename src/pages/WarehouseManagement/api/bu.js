
const bus = [
  '815', 'CDBU', 'CSPG', 'CVEBU', 'CVTG',  
  'EDVT', 'ERBU', 'FTX', 'ICT', 'MKD', 'MTP', 'NWE', 
  'PABU', 'RCFA', 'SCBU', 'SERE', 'SFPG', 'SRG', 'TIPBU',
  'UABU', 'UCEBU', 'UAG', 'UCEBU', 'WNG&IoTG', 'WSTG'
];

const getBu = (limit) => {
  return (limit) ? bus.slice(0, limit) : bus;
};

export {
  getBu
};