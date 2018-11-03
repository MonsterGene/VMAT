const tipbu_6streams_path = [
  {
    path: '/tipbu-6streams/home',
    meta: { breadcrumb: true },
    name: 'tipbu-6streams/home',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/tipbu_6streams/pages/home.vue`
    )
  },
];

export default tipbu_6streams_path;


// in router/paths.js, you just need to add below twe lines
// import tipbu_6streams_path from '../pages/tipbu_6streams/path';
// paths.push(...tipbu_6streams_path);