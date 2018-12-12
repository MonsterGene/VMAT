const router = [
  {
    path: '/green_connect',
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