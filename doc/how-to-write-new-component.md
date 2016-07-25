# isomorphic-order 开发指南

## 背景
使用React前端框架，Redux数据流管理，ES6语法编写，使用Babel进行代码转译，Webpack打包。

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
### Actions
action是一个对象
* 在`actions/action-types`中添加新action的标识
  *`actions/action-types`包含工程中所有的actions*
```
export const LOGIN_IN = 'LOGIN_IN';
export const LOGIN_OUT = 'LOGIN_OUT';
export const SET_LOGIN_STATE_TO_HAS_LOGIN = 'SET_LOGIN_STATE_TO_HAS_LOGIN';
export const SET_LOGIN_STATE_TO_HAS_LOGOUT = 'SET_LOGIN_STATE_TO_HAS_LOGOUT';
export const SET_LOGIN_STATE_TO_REGISTER = 'SET_LOGIN_STATE_TO_REGISTER';
```
* 添加`actions/signin-actions.js`文件，

```
import * as types from './action-types';

export function loginIn(){
  return {
    type: types.LOGIN_IN;
  }
}

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
`reduce`是`action`的处理函数，用于修改`store`对象。
添加`reduces/signin-reduces.js`文件。
```
import * as types from '../actions/action-types';

function signin(state, action) {
  switch (action.type) {
    case types.LOGIN_IN:
      return Object.assign({}, state, {
        //loginSuccess: true,
        startLogin: true,
      });
    case types.LOGIN_OUT:
      return state;
    default:
      return state;
  }
}
```

在`reduces/index.js`中指定`singin-reduces.js`处理`store`的哪一个部分。
```
import {combineReducers} from 'redux';
import order from './order-reduces';
import signin from './signin-reduces';
export default combineReducers({
 order,
 signin,
})
```

### Component
每一个component是`pages/`下**一个独立的文件夹**，可以维护自己的`style` `img` `sub components`。
最简demo
```
import React from 'react';

export class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    return <h1>Hello World</h1>
  }
};


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signinActions from '../../actions/signin-actions';
export default connect(state => ({
    state: state.signin
  }),
  (dispatch) => ({
    actions: bindActionCreators(signinActions, dispatch)
  })
)(Signin);
```

## TO-DO
* **前后端同构方法研究**
* **node代理服务器(手工 || [koa][koa] || [express][express])**
* 作业展示PPT
  * 首屏对比的图表可以参考 http://www.alloyteam.com/2016/06/react-isomorphic/
* 登录页面模块
* 使用手脚架方便生成模板代码([Yeoman][Yeoman]) ??
* 引入React-router做页面跳转路由 ??

## 参考资料
koa
>https://github.com/koajs/koa
[koa]:https://github.com/koajs/koa

express
>https://github.com/expressjs/express
[express]:https://github.com/expressjs/express

Yeoman
>https://github.com/yeoman/yeoman
[Yeoman]:https://github.com/yeoman/yeoman

## 完
