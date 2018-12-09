const gac_router = [
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'gac/login',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/gac/pages/login.vue`
    )
  },
  {
    path: '/register',
    meta: {
      public: true,
    },
    name: 'gac/register',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/gac/pages/register.vue`
    )
  },
  {
    path: '/forget-password',
    meta: {
      public: true,
    },
    name: 'gac/forget-password',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/gac/pages/forget-password.vue`
    )
  },
  {
    path: '/change-password',
    meta: {
      public: true,
    },
    name: 'gac/change-password',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/gac/pages/change-password.vue`
    )
  },
  {
    path: '/edit-profile',
    meta: {
      public: true,
    },
    name: 'gac/edit-profile',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/gac/pages/edit-profile.vue`
    )
  },
];

export default gac_router;
