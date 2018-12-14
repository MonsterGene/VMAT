const router = [
  {
    path: '/energy_management',
    meta: { theme: 'blue' },
    component: () => import('./GC.vue'),
    children: [
      {
        path: 'home',
        meta: { breadcrumb: false },
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `./pages/Home.vue`
        )
      }
    ]
  }
  
];

export default router;