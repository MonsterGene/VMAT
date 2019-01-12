const RouterView = () => import(`@/components/RouterView.vue`);
const Asset = () => import(`@/pages/WarehouseManagement/pages/TestDevice/Asset`);
const Maintenance = () => import(`@/pages/WarehouseManagement/pages/TestDevice/Maintenance`);
const Check = () => import(`@/pages/WarehouseManagement/pages/TestDevice/Check`);

export default {
  path: 'test_device',
  meta: { breadcrumb: false },
  component: RouterView,
  children: [
    {
      path: '',
      meta: { breadcrumb: false },
      component: Asset
    },
    {
      path: 'home',
      meta: { breadcrumb: false },
      component: Asset
    },
    {
      path: 'asset',
      meta: { breadcrumb: false },
      component: Asset
    },
    {
      path: 'check',
      meta: { breadcrumb: false },
      component: Check
    },
    {
      path: 'maintenance',
      meta: { breadcrumb: false },
      component: Maintenance
    },
    
  ]
};