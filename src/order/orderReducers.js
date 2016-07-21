import { combineReducers } from 'redux';

import {INVALIDATE_ORDERS, REQUEST_ORDERS, RECEIVE_ORDERS, REQUEST_ORDERS_FAILED, CHANGE_SELECTED_TAB} from './orderActions';

function ordersByType(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_ORDERS:
    case RECEIVE_ORDERS:
    case REQUEST_ORDERS:
      return Object.assign({}, state, {
        [action.orderType]: orders(state[action.orderType], action)
      });
    default:
      return state;
  }
}

function orders(state = {
  isFetching: false,
  hasMore: true,
  pageNum: 1,
  items: []
}, action) {
  switch(action.type) {
    case REQUEST_ORDERS:
      console.log('isLoadMore', action.isLoadMore);
      return Object.assign({}, state, {
        isFetching: true,
        hasMore: true,
        items: action.isLoadMore ? state.items : []
      });
    case RECEIVE_ORDERS:
      console.log('receive_orders:');
      console.log(state.items.slice());
      return Object.assign({}, state, {
        isFetching: false,
        hasMore: action.hasMore,
        items: state.items.slice().concat(action.orders),
        lastUpdated: action.receivedAt,
        pageNum: action.pageNumber
      });
    case REQUEST_ORDERS_FAILED:
      return Object.assign({}, state, {
        isFetching: false
      });
    default: 
      return state;
  }
}

function selectedTab(state={}, action) {
  switch (action.type) {
    case CHANGE_SELECTED_TAB:
      return Object.assign({}, state, {
        [action.namespace]: action.tab
      });
    default: 
      return state;
  }
}

// function selectedTab(state, tabNamespace, tab) {
//   return state.set(tabNamespace, tab);
// }

// export default function(state = Map(), action) {
//   switch (action.type) {
//     case 'SET_STATE':
//       return setState(state, action.state);

//     case 'CHANGE_SELECTED_TAB':
//       return changeSelectedTab(state, action.namespace, action.tab);

//   }
//   return state;
// }

const rootReducer = combineReducers({
  ordersByType,
  selectedTab
});

export default rootReducer;