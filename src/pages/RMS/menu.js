const menu = [
  {
    title: 'RMS',
    group: '/rms',
    icon: 'view_compact',
    items: [
      {
        title: 'WIP管理&品質反饋',
        group: '/wip',
        icon: 'view_compact',
        items: [
          { title: 'WIP trend & Quality feed back', path: 'page1' },
          { title: 'WIP detail status', path: 'page2' },
          { title: 'Check-in/out', path: 'page3' },
          { title: '維修數據錄入', path: 'page4' },
          { title: '查詢', path: 'page5' }
        ]
      },
      {
        title: 'Smart debug',
        group: '/smart_debug',
        icon: 'view_compact',
        items: [
          { title: '不良位置參考', path: '#' },
          { title: '智能維修步驟', path: '#' },
          { title: '經驗分享', path: '#' }
        ]
      },
      {
        title: '維修績效管理',
        group: '/kpi',
        icon: 'view_compact',
        items: [
          { title: '按件計酬', path: '#' },
          { title: 'ICT UPH', path: '#' },
          { title: 'FT UPH', path: '#' },
          { title: 'ICT返修率', path: '#' },
          { title: 'FT 返修率', path: '#' }
        ]
      },
      {
        title: '重工管理',
        group: '/rework',
        icon: 'view_compact',
        items: [
          { title: 'PTH/BGA WIP 狀態&重工品質', path: '#' },
          { title: 'WIP detail status', path: '#' },
          { title: 'Check-in/out', path: '#' },
          { title: '批量重工', path: '#' },
          { title: '數據錄入', path: '#' },
          { title: '查詢', path: '#' }
        ]
      },
      {
        title: '物料管理',
        group: '/material_management',
        icon: 'view_compact',
        items: [
          { title: '庫存狀態', path: 'stockstatus' },
          { title: '維修員物料需求', path: 'usedstatus' },
          { title: '物料員申請', path: 'assistantapply' },
          { title: '維修員領料/退料', path: 'reneedorreturn' },
          { title: '物料員退料', path: 'assistantreturn' },
          { title: '報廢管理', path: 'scrap' }
        ]
      },
      {
        title: '學習園地',
        group: '/study_space',
        icon: 'view_compact',
        items: [
          { title: '維修SOP', component: '#' },
          { title: '客人文件', component: '#' },
          { title: '業界標準', component: '#' },
          { title: '客人稽核問題點追蹤', component: '#' },
          { title: '其他', component: '#' }
        ]
      }
    ]
  }
];

export default menu;