const genius_router = [
  {
    path: '/genius/machine',
    meta: {
      breadcrumb: false,
      theme: 'purple'
    },
    name: 'genius/machine',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/genius/pages/machine.vue`
    )
  }
];

export default genius_router;
