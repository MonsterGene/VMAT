const tipbu_6streams_path = [
  {
    path: '/tipbu-6streams',
    name: 'tipbu-6streams',
    meta: {
      theme: 'jean-black'
    },
    component: () => import('./App.vue'),
    children: [
      {
        path: '',
        meta: { breadcrumb: false },
        component: () => import(`@/pages/tipbu_6streams/pages/layout.vue`)
      },
      {
        path: 'home',
        meta: { breadcrumb: false },
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `@/pages/tipbu_6streams/pages/layout.vue`
        )
      },
      {
        path: 'line',
        meta: { breadcrumb: false },
        component: () => import(`@/pages/tipbu_6streams/pages/line`)
      },
      {
        path: 'line-details/:lineName',
        meta: { breadcrumb: false },
        component: () => import(`@/pages/tipbu_6streams/pages/lineDetails.vue`)
      },
      {
        path: 'station-details/:stationName',
        meta: { breadcrumb: false },
        component: () => import(`@/pages/tipbu_6streams/pages/stationDetails.vue`)
      }
    ]
  }
];

export default tipbu_6streams_path;


// in router/paths.js, you just need to add below twe lines
// import tipbu_6streams_path from '../pages/tipbu_6streams/path';
// paths.push(...tipbu_6streams_path);