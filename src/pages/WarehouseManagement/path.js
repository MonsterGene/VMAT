// 定義常量router
const router = [
  {
    path: '/WMS',
    component: () => import('./WMS.vue'),
    meta: {
      theme: 'jean-black',   // 默認主題為黑色
    },
    // 定義子路由
    children: [
      {
        path: 'home',
        meta: { breadcrumb: false },  // 導航條不顯示
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `./pages/Home.vue`
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
        path: 'fixture',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Fixture&Consumables/TestFixture.vue`)
      },
      {
        path: 'wire',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Fixture&Consumables/Wire.vue`)
      },
      {
        path: 'utdGB',
        meta: { breadcrumb: false },
        component: () => import(`./pages/GoldBoard/UTDGB.vue`)
      },
      {
        path: 'GBc',
        meta: { breadcrumb: false },
        component: () => import(`./pages/GoldBoard/GBCapacity.vue`)
      },
      {
        path: 'rGB',
        meta: { breadcrumb: false },
        component: () => import(`./pages/GoldBoard/RotationGB.vue`)
      }
    ]
  }
];

export default router;