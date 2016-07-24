/**
 * by CntChen 2016.07.24
 */

import * as types from './action-types';

export function requestOrders(orderType, isLoadMore) {
  return {
    type: types.REQUEST_ORDERS,
    orderType,
    isLoadMore
  }
}

// TODO 比较运算，也需要移出 2016.07.24
export function receiveOrders(orderType, json, pageNumber) {
  return {
    type: types.RECEIVE_ORDERS,
    orderType,
    hasMore: pageNumber < json.data.totalPages,
    orders: json.data.orderList,
    pageNumber: pageNumber
  };
}

export function requestOrdersFailed(orderType) {
  return {
    type: types.REQUEST_ORDERS_FAILED,
    orderType
  }
}

export function changeSelectedTab(selectedTab, tabNamespace) {
  console.log(selectedTab);
  return {
    type: types.CHANGE_SELECTED_TAB,
    tab: selectedTab,
    namespace: tabNamespace
  }
}


