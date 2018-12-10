const gac_menu = [
  {
    title: 'GAC',
    icon: 'filter_vintage',
    items: [
      { name: 'login', title: 'Login', component: 'gac/login' },
      { name: 'register', title: 'Register', component: 'gac/register' },
      { name: 'forget-password', title: 'Forget Password', component: 'gac/forget-password' },
      { name: 'change-password', title: 'Change Password', component: 'gac/change-password' },
      { name: 'edit-profile', title: 'Edit Profile', component: 'gac/edit-profile' },
    ]
  },
];

export default gac_menu;