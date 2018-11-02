# 安装
[先下载源代码](FII_FG_BEACON_VMAT_WEB)：
https://github.com/tookit/vue-material-admin/archive/master.zip

下载完成后从代码路径打开命令行工具：
![image.png](https://upload-images.jianshu.io/upload_images/7547129-09b32b945939c3f8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

输入命令进行安装项目所需依赖包：
```
npm install
```
网络问题：
可能你在公司无法直接联网，需要设置代理，下面是npm设置代理的方法，如果你的代理不需要验证则忽略username和password：
```
npm config set proxy=http://username:password@ip:port // 设置http代理
npm config set https_proxy=https://username:password@ip:port // 设置https代理
```
如果你的代理无法下载某些资源，请自行学习科学上网方法。

镜像问题：
为了提高依赖包的下载速度或防止资源被墙，我们可能需要使用国内镜像进行下载，这里推荐一个工具快速切换镜像资源地址 nrm 。
使用 `nrm ls` 查看所有可用源，用 `nrm use <registry name>` 切换镜像源。

安装完之后，只需三步即可开发你的页面了：
#### 第一步：添加路由
打开 `src/router/paths.js` 文件，写入如下代码：
![image.png](https://upload-images.jianshu.io/upload_images/7547129-04b59441d9a24319.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 第二步：添加链接到菜单项
打开 `src/api/menu.js` 文件，在你要添加菜单项的地方，加上这样一个配置：
![image.png](https://upload-images.jianshu.io/upload_images/7547129-448dd7ef6a9ed248.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
路由属性可在 vue-router 教程中学习到。只需要定义name，title，component三个属性即可连接到你需要的页面。
#### 第三步：开始开发页面
完成了上面两步，我们就可以进行页面的开发了，我们的页面应该要放到 `src/pages` 路径下。下面是页面的基本模板代码，为了使每个子页面的边界统一，建议将页面全部包裹到 `<v-container grid-list-xl fluid>` 里面：
![image.png](https://upload-images.jianshu.io/upload_images/7547129-888866e85f4a3fa0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

建议每个页面建立一个文件夹，因为有可能你的那个页面比较复杂，你会将页面再分成几块来开发，这时候就需要文件夹将他们归集到一起。另外，如果你在开发页面过程中写了一个比较通用的组件，你可以把这个组件抽离出来，放在components文件夹下。

>PS: 后续我们会将第一步、第二步的操作进行简化，让你更专注于你的页面开发上面。
