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

## Api - 从QQ音乐抓取线上真实数据

* 数据从哪儿来？
    * 首先在谷歌调试工具里看XHR，你会发现并没有任何数据，说明数据并不是Ajax请求
    * 在JS里，会看到以fcg开头的js文件，这并不是普通的脚本文件，看它的Response，返回值类似于函数的调用，这就是通常所说的jsonp

* jsonp是用来干什么的？
    * 解决跨域问题

* jsonp的原理以及应用
    * jsonp发送的请求并不是Ajax请求
    * 动态创建script标签，因为scrit标签是没有同源策略限制的，是可以跨域的
    * 创建script标签，把src指向我们请求正式服务端地址
    * 然后服务端会解析到url，然后在返回数据的时候使用 `a(数据)`，相当于执行调用
    * 在前端没有a这个方法的，在window上注册这个a方法

* jsonp请求的地址和普通Ajax地址有什么不一样的地方？
    * 地址的后面通常会有一个叫做callback的东东，callback=a

## Components

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

