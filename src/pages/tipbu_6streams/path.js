const tipbu_6streams_path = [
  {
    path: '/tipbu-6streams/line-details',
    meta: { breadcrumb: true },
    name: 'tipbu-6streams',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/tipbu_6streams/pages/home.vue`
    )
  },
  {
    path: '/tipbu-6streams',
    meta: { breadcrumb: true },
    name: 'tipbu-6streams',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/tipbu_6streams/pages/line.vue`
    )
  },
];

export default tipbu_6streams_path;


// in router/paths.js, you just need to add below twe lines
// import tipbu_6streams_path from '../pages/tipbu_6streams/path';
// paths.push(...tipbu_6streams_path);