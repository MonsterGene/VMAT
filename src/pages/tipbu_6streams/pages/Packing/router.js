const RouterView = () => import(`@/components/RouterView.vue`);
const Line = () => import(`@/pages/tipbu_6streams/pages/Packing/line`);
const LineDetail = () => import(`@/pages/tipbu_6streams/pages/Packing/lineDetails.vue`);
const StationDetails = () => import(`@/pages/tipbu_6streams/pages/Packing/stationDetails.vue`);

export default {
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
};
