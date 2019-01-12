const RouterView = () => import(`@/components/RouterView.vue`);
const InfoConsumables = () => import(`@/pages/WarehouseManagement/pages/FixtureConsumables/InfoConsumables`);
const TestFixture = () => import(`@/pages/WarehouseManagement/pages/FixtureConsumables/TestFixture`);
const Wire = () => import(`@/pages/WarehouseManagement/pages/FixtureConsumables/Wire`);

export default {
  path: 'fixture_comsumables',
  meta: { breadcrumb: false },
  component: RouterView,
  children: [
    {
      path: '',
      meta: { breadcrumb: false },
      component: Wire
    },
    {
      path: 'home',
      meta: { breadcrumb: false },
      component: Wire
    },
    {
      path: 'wire',
      meta: { breadcrumb: false },
      component: Wire
    },
    {
      path: 'test_fixture',
      meta: { breadcrumb: false },
      component: TestFixture
    },
    {
      path: 'info_consumables',
      meta: { breadcrumb: false },
      component: InfoConsumables
    },
    
  ]
};