/**
 * by CntChen 2016.02.26
 */

import {combineReducers} from 'redux';
import order from './order-reduces';
import signin from './signin-reduces';

// production
// export default combineReducers({
//  order,
//  signin,
// })

// dev: 监控 state
export default function(state = {}, action){

  let newState = Object.assign(
    {},
    {
      order: order(state.order, action),
      signin: signin(state.signin, action)
    }
  );

  console.log(newState);
  return newState;
} 

