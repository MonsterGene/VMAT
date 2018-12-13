const router = [
  {
    path: '/WMS',
    component: () => import('./WMS.vue'),
    meta: {
      theme: 'blue'
    },
    children: [
      {
        path: 'page0',
        meta: { breadcrumb: true },
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `./pages/MainInterface.vue`
        )
      },
      {
        path: 'page1',
        meta: { breadcrumb: true },
        component: () => import(`./pages/TestDeviceM.vue`)
      },
      {
        path: 'page2',
        meta: { breadcrumb: true },
        component: () => import(`./pages/Tool&ConsumablesM.vue`)
      },
      {
        path: 'page3',
        meta: { breadcrumb: true },
        component: () => import(`./pages/GoldBoardM.vue`)
      },
      {
        path: 'asset',
        meta: { breadcrumb: true },
        component: () => import(`./pages/GoldBoardM.vue`)
      },
    ]
  }
];

export default router;