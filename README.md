# vue-music

> 炸鸡音乐App

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

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

### 通过jsonp跨域抓取轮播图组件的数据

* 参考[jsonp](https://github.com/webmodules/jsonp)

### 通过反向代理方式抓取推荐歌单的数据

* 起因：由于host与refer的限制，前端不能直接修改request header的host与refer,通过后端代理的方式解决数据问题
* 后端代理怎么做呢?
    * 使用express框架在服务器端请求数据（正式线上服务器），那么在前端的表现就是请求本地服务器的接口
    * 在dev.server.js中，使用express.Router()创建一个路由
    * 在apiRoutes里面配置路由
    * 在app.use('/api/getData', apiRoutes)挂载路由
    * 在前端直接使用axios发送请求


## Components

### m-header(页面头部组件)

* 目前的功能只是显示在主页，暂时没有业务逻辑功能，所以在template/style里面添加代码
* 在App.vue文件中使用三部曲
    * 使用import导入
    * 使用components在组件中注册
    * 在模板中使用（注意组件名称的大小写）

### tab(顶部导航组件)
* tab组件相当于整个项目的导航
* tab组件开发流程
    * 使用import导入路由，使用Vue.use(router)使用路由
    * 在router/index.js文件中配置顶层导航路由，每个路由由path/component组成
    * 在tab.vue文件中，在template模板中设置router-link，注意router-link的tag/to属性，
    * 每个router-link在激活后，都会添加router-link-active的class
    * 在App.vue中导入、注册、使用

### slider(轮播图组件)
* 轮播图效果
* 轮播图组件开发流程
    * slider-group(滚动的图片)
        * 在页面结构上，使用slot插槽特性，将slider组件包裹的内容插槽至组件中
        * 在js中，外界调用这个组件可以有哪些功能，将这个功能写在props里,暴露给外界
        * slider计算宽度并初始化，初始化时机在生命周期钩子mounted
        * 保证DOM成功渲染，setTimeout(function(){}, 20), $.nextTick

    * dots(小圆点)
        * 确定小圆点的个数
        * 确定当前滚动的是第几页
    
    * 自动播放
        * index的变化，计算index即可
        * 定时器的应用，要注意scrollEnd事件