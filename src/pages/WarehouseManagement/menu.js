/*
* menu.js 定义左侧菜单栏
*/
const menu = [
  {
    title: '庫房管理系統',   // 系统标题
    icon: 'view_compact',   // 菜單圖標
    group: '/WMS',          // 組名
    path: 'main_interface',          // 組件地址

    // 定义二级菜单
    items: [
      // 主页
      {
        title: '主页',
        path: 'main_interface'
      },

      // 測試設備管理菜單
      {
        title: '測試設備管理',
        group: '',
        icon: 'view_compact',
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
        group: '',
        items: [
          { title: '線材管理', path: 'wire' },
          { title: 'SFP管理', path: 'sfp' },
          { title: '工具管理', path: 'tools' },
          { title: 'Test治具管理', path: 'fixture' },
          { title: '資訊類耗材管理', path: 'info' }
          
        ]
      },

      // Gold Board管理菜單
      { 
        title: 'Gold Board管理', 
        group: '',
        items: [
          { title: 'Gold Sample', path: 'sample' }
        ]
      },
    ]
  },
];
// 输出menu
export default menu;