const menu_6streams_tipbu = [
  {
    title: 'NPBG-龙华-MFG3',
    icon: 'view_compact',
    group: '/tipbu-6streams',
    items: [
      { title: '组装线', path: 'packing' },
      {
        title: '测试自动化',
        group: 'auto_test',
        items: [
          // { title: '智能监控', path: 'intelligent_surveillance' },
          { title: '智能监控', path: 'line_detail' },
          { title: '状态看板', path: 'status_board' },
          {
            title: '良率跟踪',
            group: 'yield_watch',
            items: [
              { title: 'AT', path: 'at' },
              { title: 'Run In', path: 'run_in' }
            ]
          },
          { title: '设备维护', path: 'facilities_maintenance' },
          { title: 'Robot', path: 'robot' }
        ]
      }
    ]
  }
];

export default menu_6streams_tipbu;


// in api/menu.js, you just need to add below twe lines
// import tipbu_6streams_menu from '../../pages/tipbu_6streams/menu';
// Menu.push(...tipbu_6streams_menu);