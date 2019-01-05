const RouterView = () => import(`@/components/RouterView.vue`);

const AutoTestPath = '@/pages/tipbu_6streams/pages/AutoTest/';
const Line = () => import(`${AutoTestPath}Line`);
const LineDetail = () => import(`${AutoTestPath}LineDetail`);
const StationDetail = () => import(`${AutoTestPath}StationDetail`);
// const IntelligentSurveillance = () => import(`${AutoTestPath}IntelligentSurveillance`);
const StatusBoard = () => import(`${AutoTestPath}StatusBoard`);
const AT = () => import(`${AutoTestPath}AT`);
const RunIn = () => import(`${AutoTestPath}RunIn`);
const FacilitiesMaintenance = () => import(`${AutoTestPath}FacilitiesMaintenance`);
const Robot = () => import(`${AutoTestPath}Robot`);

export default {
  path: 'auto_text',
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
      path: 'line_detail', // 整线智能监控
      meta: { breadcrumb: false },
      component: LineDetail
    },
    {
      path: 'station_detail', // 单站智能监控
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