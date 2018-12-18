// 定義常量router
const router = [
  {
    path: '/WMS',
    component: () => import('./WMS.vue'),
    meta: {
      theme: 'black',   // 默認主題為黑色
    },
    // 定義子路由
    children: [
      {
        path: 'main_interface',
        meta: { breadcrumb: false },  // 導航條不顯示
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `./pages/MainInterface.vue`
        )
      },
      {
        path: 'asset',
        meta: { breadcrumb: false },
        component: () => import(`./pages/TestDevice/Asset.vue`)
      },
      {
        path: 'maintenance',
        meta: { breadcrumb: false },
        component: () => import(`./pages/TestDevice/Maintenance.vue`)
      },
      {
        path: 'check',
        meta: { breadcrumb: false },
        component: () => import(`./pages/TestDevice/Check.vue`)
      },
      {
        path: 'info',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Fixture&Consumables/InfoConsumables.vue`)
      },
      {
        path: 'sfp',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Fixture&Consumables/SFP.vue`)
      },
      {
        path: 'fixture',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Fixture&Consumables/TestFixture.vue`)
      },
      {
        path: 'tools',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Fixture&Consumables/Tools.vue`)
      },
      {
        path: 'wire',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Fixture&Consumables/Wire.vue`)
      },
      {
        path: 'sample',
        meta: { breadcrumb: false },
        component: () => import(`./pages/GoldBoard/GoldSample.vue`)
      },
    ]
  }
];

export default router;