const RouterView = () => import(`@/components/RouterView.vue`);
const GBCapacity = () => import(`@/pages/WarehouseManagement/pages/GoldBoard/GBCapacity`);
const RotationGB = () => import(`@/pages/WarehouseManagement/pages/GoldBoard/RotationGB`);
const UTDGB = () => import(`@/pages/WarehouseManagement/pages/GoldBoard/UTDGB`);

export default {
  path: 'gold_board',
  meta: { breadcrumb: false },
  component: RouterView,
  children: [
    {
      path: '',
      meta: { breadcrumb: false },
      component: UTDGB
    },
    {
      path: 'home',
      meta: { breadcrumb: false },
      component: UTDGB
    },
    {
      path: 'utd_GB',
      meta: { breadcrumb: false },
      component: UTDGB
    },
    {
      path: 'rotation_GB',
      meta: { breadcrumb: false },
      component: RotationGB
    },
    {
      path: 'GB_capacity',
      meta: { breadcrumb: false },
      component: GBCapacity
    },
    
  ]
};