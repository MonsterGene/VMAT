const Layout = () => import(`@/pages/tipbu_6streams/pages/layout.vue`);
const RouterView = () => import(`@/components/RouterView.vue`);
const Line = () => import(`@/pages/tipbu_6streams/pages/Packing/line`);
const LineDetail = () => import(`@/pages/tipbu_6streams/pages/Packing/lineDetails.vue`);
const StationDetails = () => import(`@/pages/tipbu_6streams/pages/Packing/stationDetails.vue`);

// const AutoTestPath = '@/pages/tipbu_6streams/pages/AutoTest/';
// const AutoTestLine = () => import(`${AutoTestPath}AutoTestLine`);
// const IntelligentSurveillance = () => import(`${AutoTestPath}IntelligentSurveillance`);
// const StatusBoard = () => import(`${AutoTestPath}StatusBoard`);
// const StatusBoard = () => import(`${AutoTestPath}StatusBoard`);


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
      {
        path: 'packing',
        meta: { breadcrumb: false },
        component: RouterView,
        children: [
          {
            path: '',
            meta: { breadcrumb: false },
            component: Line
          },
          {
            path: 'home',
            meta: { breadcrumb: false },
            component: Line
          },
          {
            path: 'line',
            meta: { breadcrumb: false },
            component: Line
          },
          {
            path: 'line-details/:lineName',
            meta: { breadcrumb: false },
            component: LineDetail
          },
          {
            path: 'station-details/:stationName',
            meta: { breadcrumb: false },
            component: StationDetails
          }
        ]
      },
      // {
      //   path: 'auto_text',
      //   meta: { breadcrumb: false },
      //   component: RouterView,
      //   children: [
      //     {
      //       path: '',
      //       meta: { breadcrumb: false },
      //       component: AutoTestLine
      //     },
      //     {
      //       path: 'home',
      //       meta: { breadcrumb: false },
      //       component: AutoTestLine
      //     },
      //     {
      //       path: 'intelligent_surveillance',
      //       meta: { breadcrumb: false },
      //       component: IntelligentSurveillance
      //     },
      //     {
      //       path: 'status_board',
      //       meta: { breadcrumb: false },
      //       component: StatusBoard
      //     }
      //   ]
      // }
    ]
  }
];

export default tipbu_6streams_path;


// in router/paths.js, you just need to add below twe lines
// import tipbu_6streams_path from '../pages/tipbu_6streams/path';
// paths.push(...tipbu_6streams_path);