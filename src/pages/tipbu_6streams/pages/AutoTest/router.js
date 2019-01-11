const RouterView = () => import(`@/components/RouterView.vue`);

const Line = () => import(`./Line`);
const LineDetail = () => import(`./LineDetail`);
const StationDetail = () => import(`./StationDetail`);
// const IntelligentSurveillance = () => import(`${AutoTestPath}IntelligentSurveillance`);
const StatusBoard = () => import(`./StatusBoard`);
const AT = () => import(`./AT`);
const RunIn = () => import(`./RunIn`);
const FacilitiesMaintenance = () => import(`./FacilitiesMaintenance`);
const Robot = () => import(`./Robot`);

export default {
  path: 'auto_test',
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
      path: 'line', // 流水线展示页
      meta: { breadcrumb: false },
      component: Line
    },
    {
      path: 'line_detail/:lineName', // 整线智能监控
      meta: { breadcrumb: false },
      component: LineDetail
    },
    {
      path: 'station_detail/:stationName', // 单站智能监控
      meta: { breadcrumb: false },
      component: StationDetail
    },
    {
      path: 'intelligent_surveillance', // 智能监控
      meta: { breadcrumb: false },
      // component: IntelligentSurveillance
    },
    {
      path: 'status_board',
      meta: { breadcrumb: false },
      component: StatusBoard
    },
    {
      path: 'yield_watch', // 良率跟踪
      meta: { breadcrumb: false },
      component: RouterView,
      children: [
        {
          path: 'at', // AT
          meta: { breadcrumb: false },
          component: AT
        },
        {
          path: 'run_in', // Run In
          meta: { breadcrumb: false },
          component: RunIn
        }
      ]
    },
    {
      path: 'facilities_maintenance', // 设备维护
      meta: { breadcrumb: false },
      component: FacilitiesMaintenance
    },
    {
      path: 'robot', // Robot
      meta: { breadcrumb: false },
      component: Robot
    }
  ]
};