import React from 'react';
import ReactDOM from 'react-dom';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reduces/index';
import {OrderContainer} from './pages/order/OrderContainer';


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


require('./styles/framework7.ios.custom.css');
require('./styles/basic.less');

ReactDOM.render(
  <Provider store={store}>
    <OrderContainer />
  </Provider>,
  document.getElementById('app')
);
