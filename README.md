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
封装m-header基础组件注意事项：
* 目前的功能只是显示在主页，暂时没有业务逻辑功能，所以在template/style里面添加代码
* 在App.vue文件中使用三部曲
    * 使用import导入
    * 使用components在组件中注册
    * 在模板中使用（注意组件名称的大小写）