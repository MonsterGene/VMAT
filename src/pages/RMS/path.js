const router = [
  {
    path: '/rms/page1',
    meta: { breadcrumb: false },
    name: 'rms/page1',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/WipManage/wipTrend.vue`
    )
  },
  {
    path: '/rms/page2',
    meta: { breadcrumb: false },
    name: 'rms/page2',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/404.vue`
    )
  },
  {
    path: '/rms/page3',
    meta: { breadcrumb: false },
    name: 'rms/page3',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/404.vue`
    )
  },
  {
    path: '/rms/page4',
    meta: { breadcrumb: false },
    name: 'rms/page4',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/404.vue`
    )
  },
  {
    path: '/rms/page5',
    meta: { breadcrumb: false },
    name: 'rms/page5',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/404.vue`
    )
  },
  // 库存管理
  {
    path: '/rms/stockstatus', 
    meta: { breadcrumb: false },
    name: 'rms/stockstatus',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/materialmanage/stockstatus.vue`
    )
  },
  {
    path: '/rms/usedstatus', 
    meta: { breadcrumb: false },
    name: 'rms/usedstatus',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/materialmanage/usedstatus.vue`
    )
  },
  {
    path: '/rms/assistantapply', 
    meta: { breadcrumb: false },
    name: 'rms/assistantapply',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/materialmanage/assistantapply.vue`
    )
  },
  {
    path: '/rms/reneedorreturn', 
    meta: { breadcrumb: false },
    name: 'rms/reneedorreturn',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/materialmanage/reneedorreturn.vue`
    )
  },
  {
    path: '/rms/assistantreturn', 
    meta: { breadcrumb: false },
    name: 'rms/assistantreturn',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/materialmanage/assistantreturn.vue`
    )
  },
  {
    path: '/rms/scrap', 
    meta: { breadcrumb: false },
    name: 'rms/scrap',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/materialmanage/scrap.vue`
    )
  }

  
];

export default router;