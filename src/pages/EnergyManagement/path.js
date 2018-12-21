const router = isPublic => ({
  path: isPublic ? '/public/energy_management' : '/energy_management',
  meta: { theme: 'blue' },
  component: () => import('./GC.vue'),
  children: [
    {
      path: 'home',
      meta: {
        breadcrumb: false,
        public: isPublic ? true : false
      },
      component: () => import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `./pages/Home.vue`
      )
    },
    {
      path: 'floors',
      meta: {
        breadcrumb: false,
        public: isPublic ? true : false
      },
      component: () => import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `./pages/Floors.vue`
      )
    },
    {
      path: 'bu',
      meta: {
        breadcrumb: false,
        public: isPublic ? true : false
      },
      component: () => import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `./pages/Bu.vue`
      )
    }
  ]
});

export default [router(false), router(true)];
