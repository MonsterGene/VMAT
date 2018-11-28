const router = [
  {
    path: '/project/page1',
    meta: { breadcrumb: true },
    name: 'project/page1',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `./pages/template.vue`
    )
  }
];

export default router;