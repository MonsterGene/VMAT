import PackingRouter from './pages/Packing/router';
import AutoTestRouter from './pages/AutoTest/router';

const Layout = () => import(`@/pages/tipbu_6streams/pages/layout.vue`);

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
        component: Layout
      },
      PackingRouter,
      AutoTestRouter
    ]
  }
];

export default tipbu_6streams_path;


// in router/paths.js, you just need to add below twe lines
// import tipbu_6streams_path from '../pages/tipbu_6streams/path';
// paths.push(...tipbu_6streams_path);