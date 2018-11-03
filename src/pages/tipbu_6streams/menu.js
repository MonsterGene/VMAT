const tipbu_6streams_menu = [
  {
    title: 'TIPBU 6 Streams',
    group: 'project',
    component: 'project',
    icon: 'view_compact',
    items: [
      { name: 'Home', title: 'Home Page', component: 'tipbu-6streams/home' },
    ]
  },
];

export default tipbu_6streams_menu;


// in api/menu.js, you just need to add below twe lines
// import tipbu_6streams_menu from '../../pages/tipbu_6streams/menu';
// Menu.push(...tipbu_6streams_menu);