const menu = [
  {
    title: 'RMS',
    group: '/rms',
    icon: 'view_compact',
    items: [
      {
        title: 'WIP管理&品質反饋',
        group: 'wip',
        component: 'rms',
        items: [
          { 
            name: 'rms/page1', title: 'WIP trend & Quality feed back', component: 'rms/page1'
          },
          { 
            name: 'rms/page2', title: 'WIP detail status', component: 'rms/page2'
          },
          { 
            name: 'rms/page3', title: 'Check-in/out', component: 'rms/page3'
          },
          { 
            name: 'rms/page4', title: '維修數據錄入', component: 'rms/page4'
          },
          {
            name: 'rms/page5', title: '查詢', component: 'rms/page5'
          }
        ]
      },
    ]
  },
  
  {
    title: 'Smart debug',
    group: 'rms1',
    component: 'rms',
    icon: 'view_compact',
    items: [
      {
        name: '#', title: '不良位置參考', component: '#'
      },
      {
        name: '#', title: '智能維修步驟', component: '#'
      },
      {
        name: '#', title: '經驗分享', component: '#'
      }
    ]
  },
  {
    title: '維修績效管理',
    group: 'rms2',
    component: 'rms',
    icon: 'view_compact',
    items: [
      {
        name: '#', title: '按件計酬', component: '#'
      },
      {
        name: '#', title: 'ICT UPH', component: '#'
      },
      {
        name: '#', title: 'FT UPH', component: '#'
      },
      {
        name: '#', title: 'ICT返修率', component: '#'
      },
      {
        name: '#', title: 'FT 返修率', component: '#'
      }
    ]
  },
  {
    title: '重工管理',
    group: 'rms3',
    component: 'rms',
    icon: 'view_compact',
    items: [
      {
        name: '#', title: 'PTH/BGA WIP 狀態&重工品質', component: '#'
      },
      {
        name: '#', title: 'WIP detail status', component: '#'
      },
      {
        name: '#', title: 'Check-in/out', component: '#'
      },
      {
        name: '#', title: '批量重工', component: '#'
      },
      {
        name: '#', title: '數據錄入', component: '#'
      },
      {
        name: '#', title: '查詢', component: '#'
      }
    ]
  },
  {
    title: '物料管理',
    group: 'rms4',
    component: 'rms',
    icon: 'view_compact',
    items: [
      {
        name: 'rms/stockstatus', title: '庫存狀態', component: 'rms/stockstatus'
      },
      {
        name: 'rms/usedstatus', title: '維修員物料需求', component: 'rms/usedstatus'
      },
      {
        name: 'rms/assistantapply', title: '物料員申請', component: 'rms/assistantapply'
      },
      {
        name: 'rms/reneedorreturn', title: '維修員領料/退料', component: 'rms/reneedorreturn'
      },
      {
        name: 'rms/assistantreturn', title: '物料員退料', component: 'rms/assistantreturn'
      },
      {
        name: 'rms/scrap', title: '报废管理', component: 'rms/scrap'
      }
    ]
  },
  {
    title: '學習園地',
    group: 'rms5',
    component: 'rms',
    icon: 'view_compact',
    items: [
      {
        name: '#', title: '維修SOP', component: '#'
      },
      {
        name: '#', title: '客人文件', component: '#'
      },
      {
        name: '#', title: '業界標準', component: '#'
      },
      {
        name: '#', title: '客人稽核問題點追蹤', component: '#'
      },
      {
        name: '#', title: '其他', component: '#'
      }
    ]

  }
];

export default menu;