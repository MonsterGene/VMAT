import TestDeviceRouter from './pages/TestDevice/router';
import FixtureConsumablesRouter from './pages/FixtureConsumables/router';
import GoldBoardRouter from './pages/GoldBoard/router';


// 定義常量router
const path = [
  {
    path: '/WMS',
    name: '庫房管理系統',
    component: () => import('./WMS.vue'),
    meta: {
      theme: 'jean-black',   // 默認主題為黑色
    },
    // 定義子路由
    children: [
      {
        path: 'home',
        meta: { breadcrumb: false },  // 導航條不顯示
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `./pages/Home.vue`
        )
      },
      TestDeviceRouter,
      GoldBoardRouter,
      FixtureConsumablesRouter,
    ]
  }
];

export default path;