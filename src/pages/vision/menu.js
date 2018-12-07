const vision_menu = [
  // {
  //   title: 'Vision',
  //   icon: 'filter_vintage',
  //   items: [
  //     { title: 'Basic', component: '/vision/basic' },
  //     { title: 'Advanced', component: '/vision/advanced' },
  //   ]
  // },
  {
    title: 'Vision',
    icon: 'filter_vintage',
    group: '/vision',
    items: [
      { title: 'Basic', path: 'basic' },
      { title: 'Advanced', path: 'advanced' },
    ]
  },
  {
    title: 'Fortinet',
    icon: 'filter_vintage',
    group: '/fortinet',
    items: [
      { path: 'basic', title: 'Basic' },
      { path: 'advanced', title: 'Advanced' },
    ]
  },
  {
    title: 'Only Office',
    icon: 'filter_vintage',
    target: '_blank',
    href: 'http://10.132.45.188',
  },
  {
    title: 'Git Lab',
    icon: 'filter_vintage',
    target: '_blank',
    href: 'http://10.132.45.143',
  },
];

export default vision_menu;