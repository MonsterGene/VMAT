const RouterView = () => import(`@/components/RouterView.vue`);

const router = [
  {
    path: '/rms',
    component: () => import('./RMS.vue'),
    children: [
      {
        path: 'wip',
        meta: { breadcrumb: false },
        component: RouterView,
        children: [
          {
            path: '',
            meta: { breadcrumb: false },
            component: () => import(`./pages/404.vue`)
          },
          {
            path: 'page1',
            meta: { breadcrumb: false },
            component: () => import(`./pages/WipManage/wipTrend.vue`)
          },
          {
            path: 'page2',
            meta: { breadcrumb: false },
            name: 'rms/page2',
            component: () => import(`./pages/404.vue`)
          },
          {
            path: 'page3',
            meta: { breadcrumb: false },
            component: () => import(`./pages/404.vue`)
          },
          {
            path: 'page4',
            meta: { breadcrumb: false },
            component: () => import(`./pages/404.vue`)
          },
          {
            path: 'page5',
            meta: { breadcrumb: false },
            component: () => import(`./pages/404.vue`)
          },
        ]
      },
      // 库存管理
      {
        path: 'material_management',
        meta: { breadcrumb: false },
        component: RouterView,
        children: [
          {
            path: '',
            meta: { breadcrumb: false },
            component: () => import(`./pages/materialmanage/stockstatus.vue`)
          },
          {
            path: 'stockstatus',
            meta: { breadcrumb: false },
            component: () => import(`./pages/materialmanage/stockstatus.vue`)
          },
          {
            path: 'usedstatus', 
            meta: { breadcrumb: false },
            name: 'rms/usedstatus',
            component: () => import(`./pages/materialmanage/usedstatus.vue`)
          },
          {
            path: 'assistantapply', 
            meta: { breadcrumb: false },
            name: 'rms/assistantapply',
            component: () => import(`./pages/materialmanage/assistantapply.vue`)
          },
          {
            path: 'reneedorreturn', 
            meta: { breadcrumb: false },
            name: 'rms/reneedorreturn',
            component: () => import(`./pages/materialmanage/reneedorreturn.vue`)
          },
          {
            path: 'assistantreturn', 
            meta: { breadcrumb: false },
            name: 'rms/assistantreturn',
            component: () => import(`./pages/materialmanage/assistantreturn.vue`)
          },
          {
            path: 'scrap', 
            meta: { breadcrumb: false },
            name: 'rms/scrap',
            component: () => import(`./pages/materialmanage/scrap.vue`)
          }
        ]
      }
    ]
  },
  
  
  
];

export default router;