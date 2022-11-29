# vue-manage
后台管理系统实操。用于加深路由的使用以及数据的传递等知识的应用

这个项目目前仍然有两个bug仍然需要被解决
其一： 在用户界面中用户信息的展示中，为能够实现每页展示数据量以及翻页功能，并且数据的搜索也没有能够实现，这里主要就时从mock传递过来的数据可以拿到，但实际上对其操作的方法我还不知道，虽然按照视频教程上的进行书写，但实际效果却并没有实现。这两个功能的实现其实就是数据拿到后怎么操作的问题
其二：未能够实现页面路由的动态绑定，我想要实现的效果是：不同的用户登录界面，会出现不同的可操作的页面菜单。这里就是需要用到动态路由。在实际的操作中，如果将固定路由删除，就会出现整个页面的失效，如果不删除，虽然有的用户不能够拿到永辉界面，但实际上，通过url可以跳转到对应页面，这并不是我想要看到的。
以上两个问题，后面我会继续修正。


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
