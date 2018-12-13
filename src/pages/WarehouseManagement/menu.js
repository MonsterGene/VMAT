/*
* menu.js 定义左侧菜单栏
*/
const menu = [
  {
    title: '庫房管理系統',   // 系统标题
    icon: 'view_compact',
    group: '/WMS', 
    // 定义二级菜单
    items: [
      {
        // name: 'Jay/page1',
        title: '測試設備管理',
        group: '',
        icon: 'view_compact',
        items: [
          { title: '資產管理', path: 'page1' },
          { title: '校驗管理', path: 'page1' },
          { title: '保養管理', path: 'page1' },
        ]
      },
      {
        title: '治具耗材管理',
        group: '',
        items: [
          { title: '線材管理', path: '404' },
          { title: 'SFP管理', path: '404' },
          { title: 'Tset治具管理', path: '404' },
          { title: '咨詢類管理', path: '404' },
          { title: '工具管理', path: '404' }
        ]
      },
      { title: 'Gold Board管理', path: 'page3' },
    ]
  },
];
export default menu;