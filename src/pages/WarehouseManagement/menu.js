/*
* menu.js 定义左侧菜单栏
*/
const menu = [
  {
    title: '庫房管理系統',   // 系统标题
    icon: 'view_compact',   // 菜單圖標
    group: '/WMS',          // 組名

    // 定义二级菜单
    items: [
      // 主页
      { title: '主页', path: 'Home' },

      // 測試設備管理菜單
      {
        title: '測試設備管理',
        group: 'test_device',
        // 定義三級菜單欄
        items: [
          { title: '資產管理', path: 'asset' },
          { title: '校驗管理', path: 'check' },
          { title: '保養管理', path: 'maintenance' },
        ]
      },

      // 治具耗材管理菜單
      {
        title: '治具耗材管理',
        group: 'fixture_comsumables',
        items: [
          { title: '線材管理', path: 'wire' },
          { title: 'Test治具管理', path: 'test_fixture' },
          { title: '資訊類耗材管理', path: 'info_consumables' }
          
        ]
      },

      // Gold Board管理菜單
      { 
        title: 'Gold Board管理', 
        group: 'gold_board',
        items: [
          { title: 'GB Capacity', path: 'GB_capacity' },
          { title: 'Rotation GB', path: 'rotation_GB' },
          { title: 'UTD GB', path: 'utd_GB' },
        ]
      },
    ]
  },
];
// 输出menu
export default menu;