const router = [
  {
    path: '/Jay/page0',
    meta: { breadcrumb: true },
    name: 'Jay/page0',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/MainInterface.vue`
    )
  },
  {
    path: '/Jay/page1',
    meta: { breadcrumb: true },
    name: 'Jay/page1',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/TestDeviceM.vue`
    )
  },
  {
    path: '/Jay/page2',
    meta: { breadcrumb: true },
    name: 'Jay/page2',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/Tool&ConsumablesM.vue`
    )
  },
  {
    path: '/Jay/page3',
    meta: { breadcrumb: true },
    name: 'Jay/page3',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/GoldBoardM.vue`
    )
  },
  {
    path: '/Jay/asset',
    meta: { breadcrumb: true },
    name: 'Jay/asset',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/GoldBoardM.vue`
    )
  },
  // {
  //   path: '/Jay/page5',
  //   meta: { breadcrumb: true },
  //   name: 'Jay/page5',
  //   component: () => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `./pages/UseInfoMaintenance.vue`
  //   )
  // },
];

export default router;