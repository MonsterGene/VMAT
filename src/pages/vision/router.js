const vision_router = [
  {
    path: '/vision/basic',
    meta: {
      breadcrumb: false,
    },
    name: 'vision/basic',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/vision/pages/basic.vue`
    )
  },
  {
    path: '/vision/advanced',
    meta: {
      breadcrumb: false,
    },
    name: 'vision/advanced',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/vision/pages/advanced.vue`
    )
  },
  {
    path: '/fortinet/basic',
    meta: {
      breadcrumb: false,
    },
    name: 'fortinet/basic',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/vision/pages/basic.vue`
    )
  },
  {
    path: '/fortinet/advanced',
    meta: {
      breadcrumb: false,
    },
    name: 'fortinet/advanced',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/vision/pages/advanced.vue`
    )
  },
];

export default vision_router;
