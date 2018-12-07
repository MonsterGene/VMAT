const vision_router = [
  {
    path: '/vision/basic',
    meta: {
      breadcrumb: false,
    },
    name: 'basic',
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
    name: 'advanced',
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
  {
    path: '/onlyoffice',
    meta: {
      breadcrumb: false,
    },
    name: 'onlyoffice',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/vision/pages/only-office.vue`
    )
  },
  {
    path: '/gitlab',
    meta: {
      breadcrumb: false,
    },
    name: 'gitlab',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/vision/pages/git-lab.vue`
    )
  },
];

export default vision_router;
