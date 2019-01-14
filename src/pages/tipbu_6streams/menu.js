const menu_6streams_tipbu = [
  {
    title: 'NPBG智能测试',
    icon: 'view_compact',
    group: '/npbg_lh_smart_test',
    items: [
      {
        title: 'MFG 1',
        path: 'mfg_1'
      },
      {
        title: 'MFG 2',
        path: 'mfg_2'
      },
      {
        title: 'MFG 3',
        group: 'mfg_3',
        items: [
          { title: '组装线', path: 'packing' },
          {
            title: '测试自动化',
            group: 'auto_test',
            items: [
              // { title: '智能监控', path: 'intelligent_surveillance' },
              { title: '智能监控', path: 'line' },
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
      },
      {
        title: 'MFG 5',
        path: 'mfg_5'
      },
      {
        title: 'MFG 6',
        path: 'mfg_6'
      },
      {
        title: 'MFG 7',
        path: 'mfg_7'
      },
      {
        title: 'MFG 8',
        path: 'mfg_8'
      },
      
    ]
  }
];

export default menu_6streams_tipbu;


// in api/menu.js, you just need to add below twe lines
// import tipbu_6streams_menu from '../../pages/tipbu_6streams/menu';
// Menu.push(...tipbu_6streams_menu);