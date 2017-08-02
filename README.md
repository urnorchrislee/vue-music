# vue-music

> 炸鸡音乐App

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### m-header(基础组件)

* 目前的功能只是显示在主页，暂时没有业务逻辑功能，所以在template/style里面添加代码
* 在App.vue文件中使用三部曲
    * 使用import导入
    * 使用components在组件中注册
    * 在模板中使用（注意组件名称的大小写）

### tab(基础组件)
* tab组件相当于整个项目的导航
* tab组件开发流程
    * 使用import导入路由，使用Vue.use(router)使用路由
    * 在router/index.js文件中配置顶层导航路由，每个路由由path/component组成
    * 在tab.vue文件中，在template模板中设置router-link，注意router-link的tag/to属性，
    * 每个router-link在激活后，都会添加router-link-active的class
    * 在App.vue中导入、注册、使用