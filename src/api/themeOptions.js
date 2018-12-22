/**
 * name: String 主题名称
 * isDark: Boolean 主题默认是亮色还是黑暗色
 * lightSupport: String([light, dark, both]) 主题所支持的模式
 * colors: 各种颜色值：参照vuetify中自定义主题的配置方法
 *    另： sideNav： logo 背景色
 *         mainNav： 头部工具栏背景色
 *         sideMenu: 左边菜单栏背景色
 *         app: 最底层的底色
 *         header: 用作标题的背景色
 *         content： 用作内文的背景色
 */
const themeList = [
  {
    name: 'jean-black',
    isDark: true,
    lightSupport: 'dark',
    colors: {
      primary: '#24262c',
      sideNav: '#24262c',
      mainNav: '#24262c',
      sideMenu: '#30333B',
      app: '#000000',
      header: '#282A30',
      content: '#282A30'
    }
  },
  {
    name: 'blue',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#2196F3',
      sideNav: '#2196F3',
      mainNav: '#2196F3',
      sideMenu: '#FFFFFF'
    }
  },
  {
    name: 'teal',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#009688',
      sideNav: '#009688',
      mainNav: '#009688',
      sideMenu: '#FFFFFF'
    }
  },
  {
    name: 'red',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#F44336',
      sideNav: '#F44336',
      mainNav: '#F44336',
      sideMenu: '#FFFFFF'
    }
  },
  {
    name: 'orange',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#FF9800',
      sideNav: '#FF9800',
      mainNav: '#FF9800',
      sideMenu: '#FFFFFF'
    }
  },
  {
    name: 'purple',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#9C27B0',
      sideNav: '#9C27B0',
      mainNav: '#9C27B0',
      sideMenu: '#FFFFFF'
    }
  },
  {
    name: 'indigo',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#3F51B5',
      sideNav: '#3F51B5',
      mainNav: '#3F51B5',
      sideMenu: '#FFFFFF'
    }
  },
  {
    name: 'cyan',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#00BCD4',
      sideNav: '#00BCD4',
      mainNav: '#00BCD4',
      sideMenu: '#FFFFFF'
    }
  },
  {
    name: 'pink',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#E91E63',
      sideNav: '#E91E63',
      mainNav: '#E91E63',
      sideMenu: '#FFFFFF'
    }
  },
  {
    name: 'green',
    isDark: false,
    lightSupport: 'light',
    colors: {
      primary: '#4CAF50',
      sideNav: '#4CAF50',
      mainNav: '#4CAF50',
      sideMenu: '#FFFFFF'
    }
  }
];

export default themeList;
