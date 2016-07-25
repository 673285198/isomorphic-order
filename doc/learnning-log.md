## 基于React的前后端同构开发

* 纯粹的Action

Action不应该包含复杂的逻辑，这些逻辑应该在Component中完成。
例如：一个异步的网络请求，应该定义三种Action，请求开始，请求成功的结束、请求失败的结束。在模块中写异步代码，然后结果回调选择不同的Action。

* 对**整个state**的多个reduce操作组合方式
```
export default function(state = {}, action){
  let newState = Object.assign({}, signin(state, action));
  newState = Object.assign({}, setLoginState(newState, action));

  return newState;
}
```

* 对一个**state的属性**的操作的组合方式
```
export default combineReducers({
  ordersByType,
  selectedTab
});
```