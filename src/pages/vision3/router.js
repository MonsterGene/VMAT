const vision_router = [
  {
    path: '/vision3',
    component: () => import('./Vision.vue'),
    meta: {
      theme: 'blue',
    },
    children: [
      {
        path: 'basic',
        meta: {
          breadcrumb: false
        },
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `@/pages/vision/pages/basic.vue`
        )
      },
      {
        path: 'advanced',
        meta: {
          breadcrumb: false,
        },
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `@/pages/vision/pages/advanced.vue`
        )
      }
    ]
  },
  {
    path: '/fortinet3',
    meta: {
      theme: 'blue'
    },
    children: [
      {
        path: 'basic',
        meta: {
          breadcrumb: false,
        },
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `@/pages/vision/pages/basic.vue`
        )
      },
      {
        path: 'advanced',
        meta: {
          breadcrumb: false,
        },
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `@/pages/vision/pages/advanced.vue`
        )
      }
    ]
  },
  // {
  //   path: '/onlyoffice',
  //   meta: {
  //     breadcrumb: false,
  //   },
  //   name: 'onlyoffice',
  //   component: () => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `@/pages/vision/pages/only-office.vue`
  //   )
  // },
  // {
  //   path: '/gitlab',
  //   meta: {
  //     breadcrumb: false,
  //   },
  //   name: 'gitlab',
  //   component: () => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `@/pages/vision/pages/git-lab.vue`
  //   )
  // },
];

export default vision_router;
