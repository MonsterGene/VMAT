const vision_router = [
  {
    path: '/vision',
    component: () => import('./Vision.vue'),
    meta: {
      theme: 'indigo',
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
    path: '/fortinet',
    component: () => import('./Vision.vue'),
    meta: {
      theme: 'indigo'
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
  //   component: () => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `@/pages/vision/pages/git-lab.vue`
  //   )
  // }
];

export default vision_router;
