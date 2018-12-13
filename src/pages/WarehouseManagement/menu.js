/*
* menu.js 定义左侧菜单栏
*/
const menu = [
  {
    title: '庫房管理系統',   // 系统标题
    group: 'Jay', 
    component: 'Jay/page0',       
    icon: 'view_compact',
    // 定义二级菜单
    items: [
      { 
        // name: 'Jay/page1', 
        title: '測試設備管理', 
        group: 'Jay/TestDeviceManagement',
        component: 'Jay/page1',
        icon: 'view_compact',
        items: [
          { title: '資產管理', path: '#' },
          { name: 'Jay/page1', title: '校驗管理', component: '#' },
          { name: 'Jay/page1', title: '保養管理', component: '#' },
        ]
      },
      {
        name: 'Jay/page2', 
        title: '治具耗材管理', 
        component: 'Jay/page2',
        items: [
          { name: 'Jay/page1', title: '線材管理', path: '404' },
          { name: 'Jay/page1', title: 'SFP管理', path: '404' },
          { name: 'Jay/page1', title: 'Tset治具管理', path: '404' },
          { name: 'Jay/page1', title: '咨詢類管理', path: '404' },
          { name: 'Jay/page1', title: '工具管理', path: '404' }
        ]
      },
      {
        name: 'Jay/page3', 
        title: 'Gold Board管理', 
        component: 'Jay/page3'
      },
    ]
  },
];
export default menu;