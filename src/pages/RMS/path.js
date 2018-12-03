const router = [
  {
    path: '/rms/page1',
    meta: { breadcrumb: true },
    name: 'rms/page1',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/WipManage/wipTrend.vue`
    )
  },
  {
    path: '/rms/page2',
    meta: { breadcrumb: true },
    name: 'rms/page2',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/404.vue`
    )
  },
  {
    path: '/rms/page3',
    meta: { breadcrumb: true },
    name: 'rms/page3',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/404.vue`
    )
  },
  {
    path: '/rms/page4',
    meta: { breadcrumb: true },
    name: 'rms/page4',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/404.vue`
    )
  },
  {
    path: '/rms/page5',
    meta: { breadcrumb: true },
    name: 'rms/page5',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/404.vue`
    )
  }
];

export default router;