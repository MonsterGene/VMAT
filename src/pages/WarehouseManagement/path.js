const router = [
  {
    path: '/WMS',
    component: () => import('./WMS.vue'),
    meta: {
      theme: 'black',
    },
    children: [
      {
        path: 'main_interface',
        meta: { breadcrumb: false },
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `./pages/MainInterface.vue`
        )
      },
      {
        path: 'asset',
        meta: { breadcrumb: false },
        component: () => import(`./pages/TestDeviceManagement/AssetManagement.vue`)
      },
      {
        path: 'maintenance',
        meta: { breadcrumb: false },
        component: () => import(`./pages/TestDeviceManagement/MaintenanceManagement.vue`)
      },
      {
        path: 'check',
        meta: { breadcrumb: false },
        component: () => import(`./pages/TestDeviceManagement/CheckManagement.vue`)
      },
      {
        path: 'info',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Tool&ConsumablesManagement/InfoConsumablesManagement.vue`)
      },
      {
        path: 'sfp',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Tool&ConsumablesManagement/SFPManagement.vue`)
      },
      {
        path: 'fixture',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Tool&ConsumablesManagement/TestFixtureManagement.vue`)
      },
      {
        path: 'tools',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Tool&ConsumablesManagement/ToolsManagement.vue`)
      },
      {
        path: 'wire',
        meta: { breadcrumb: false },
        component: () => import(`./pages/Tool&ConsumablesManagement/WireManagement.vue`)
      },
      {
        path: 'sample',
        meta: { breadcrumb: false },
        component: () => import(`./pages/GoldBoardManagement/GoldSample.vue`)
      },
    ]
  }
];

export default router;