import React from 'react';
import ReactDOM from 'react-dom';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './pages/order/orderReducers';
import {OrderContainer} from './pages/order/OrderContainer';
import thunkMiddleware from 'redux-thunk'
import {fetchOrders, fetchOrdersIfNeeded} from './pages/order/orderActions';


const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

let initialState = {
  login: {},
  order: {},
};

const store = createStore(rootReducer, initialState, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


store.dispatch(fetchOrdersIfNeeded('unpay')).then(() =>
  console.log(store.getState())
)

require('./styles/framework7.ios.custom.css');
require('./styles/basic.less');

ReactDOM.render(
  <Provider store={store}>
    <OrderContainer />
  </Provider>,
  document.getElementById('app')
);
