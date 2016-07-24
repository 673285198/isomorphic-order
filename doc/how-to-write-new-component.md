# isomorphic-order 开发指南

## 背景
使用React前端框架，Redux数据流管理，ES6语法编写，webpack打包。

## 工程文件
### 工程目录
```
.
├── dist              // 打包后代码
├── doc               // 工程文档
├── package.json      // 工程描述，项目依赖
├── README.md
├── src               // 源码文件
└── webpack.config.js // webpack打包配置
```

### 源码目录
*现状，不一定合理*
```
.
├── actions           // Redux的Action
├── img               // 图片资源
├── index.jsx         // 源码入口
├── pages             // 基于React编写的页面
├── reduces           // Redux的Reduces
├── static            // 静态资源
└── styles            // CSS样式文件

```

## Redux简介
>http://www.infoq.com/cn/articles/react-flux
>http://cn.redux.js.org/

### 要点
* React组件的`props`和`states`
* Redux是React组件的数据流管理库
* 单向数据流
* `action`和`reduce`

## 添加新页面(模块)方法
以`signin`页面为例子
### 
### Actions
action是一个对象
* 在`/actions/action-types`中添加新action的标识
  `/actions/action-types`管理工程中所有的actions
```
export const LOGIN_IN = 'LOGIN_IN';
export const LOGIN_OUT = 'LOGIN_OUT';
export const SET_LOGIN_STATE_TO_HAS_LOGIN = 'SET_LOGIN_STATE_TO_HAS_LOGIN';
export const SET_LOGIN_STATE_TO_HAS_LOGOUT = 'SET_LOGIN_STATE_TO_HAS_LOGOUT';
export const SET_LOGIN_STATE_TO_REGISTER = 'SET_LOGIN_STATE_TO_REGISTER';
```
* 添加`/actions/signin-actions.js`文件，
```
export function setLoginStateToHasLogin(userName) {
  return {
    type: types.SET_LOGIN_STATE_TO_HAS_LOGIN,
    userName: userName,
  };
}
```
* 使用`dispatch`分发action
```
dispatch(setLoginStateToHasLogin('CntChen'));
```

### Reduces

## TO-D0
* **前后端同构方法研究**
* 作业展示PPT
  * 首屏对比的图表可以参考 http://www.alloyteam.com/2016/06/react-isomorphic/
* 引入React-router做页面跳转路由??
* 登录页面模块
