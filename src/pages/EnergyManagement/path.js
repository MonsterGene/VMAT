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
    }
  ]
});

export default [router(false), router(true)];
