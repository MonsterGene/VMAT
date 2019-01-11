const hosts = [
  {
    hostname: 'focwnbu1',
    ipAddress: '10.167.219.23',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu2',
    ipAddress: '10.167.219.25',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu3',
    ipAddress: '10.167.219.27',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu4',
    ipAddress: '10.167.219.28',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu5',
    ipAddress: '10.167.219.30',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu6',
    ipAddress: '10.167.219.31',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu7',
    ipAddress: '10.167.219.33',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu8',
    ipAddress: '10.167.219.34',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu9',
    ipAddress: '10.167.219.35',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'focwnbu10',
    ipAddress: '10.167.219.36',
    details: 'WNBU Genius Server',
    profile: true,
  },
  {
    hostname: 'fortinet1',
    ipAddress: '10.167.5.238',
    details: 'Fortinet Genius Server',
    profile: true,
  },
];

const getHosts = (params, demo) => {
  if (!demo) {
    // request server api
  } else {
    return new Promise(resolve => {
      resolve({ status: 200, data: hosts });
    });
  }
};