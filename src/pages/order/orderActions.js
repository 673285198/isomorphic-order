import fetch from 'isomorphic-fetch';

export const REQUEST_ORDERS = 'REQUEST_ORDERS';
function requestOrders(orderType, isLoadMore) {
  return {
    type: REQUEST_ORDERS,
    orderType,
    isLoadMore
  }
}

export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';
function receiveOrders(orderType, json, pageNumber) {
  return {
    type: RECEIVE_ORDERS,
    orderType,
    hasMore: pageNumber < json.data.totalPages,
    orders: json.data.orderList,
    pageNumber: pageNumber
  };
}

export const REQUEST_ORDERS_FAILED = 'REQUEST_ORDERS_FAILED';
function requestOrdersFailed(orderType) {
  return {
    type: REQUEST_ORDERS_FAILED,
    orderType
  }
}

const tabTypeMap = {
  unpay: 1,
  all: 0,
  completed: 2
};

export function fetchOrders(orderType, isLoadMore) {
  return function(disaptch, getState) {
    disaptch(requestOrders(orderType, isLoadMore));

    let tabType = tabTypeMap[orderType];
    let pageNumber = 1;
    var orderData;
    
    // 获取页数
    if (isLoadMore) {
      orderData = getState().ordersByType[orderType];
      pageNumber = orderData.pageNum + 1;
    }

    return fetch(`http://order.api.cfcmu.cn/member/order/orderList.json?tabType=${tabType}&pageNumber=${pageNumber}&pageSize=8`, 
      {credentials: 'include'}
    )
    .then(response => {
      if (response.status === 401) {
        alert('Oops, you are not authorized.');
        dispatch(requestOrdersFailed(orderType));
      } else {
        return response.json();
      }
    })
    .then(json => 
      disaptch(receiveOrders(orderType, json, pageNumber))
    ).catch(function(e) {
      console.log(e);
    });
      // todo catch the error.
  }
}

export function shouldFetchOrders(state, orderType, isLoadMore) {
  const orders = state.ordersByType[orderType];

  if (!orders) {
    return true;
  } else if (orders.isFetching) {
    return false;
  }

  if (isLoadMore && !orders.hasMore) {
    return false;
  }

  return true;
}

export const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
export function changeSelectedTab(selectedTab, tabNamespace) {
  console.log(selectedTab);
  return {
    type: CHANGE_SELECTED_TAB,
    tab: selectedTab,
    namespace: tabNamespace
  }
}

export const SWITCH_TAB_AND_REQUEST = 'SWITCH_TAB_AND_REQUEST';
export function switchTabAndRequest(selectedTab, tabNamespace) {
  return function(dispatch) {
    dispatch(changeSelectedTab(selectedTab, tabNamespace));
    dispatch(fetchOrdersIfNeeded(selectedTab));
  }
}

export function fetchOrdersIfNeeded(orderType, isLoadMore) {
  return function(dispatch, getState) {
    if (shouldFetchOrders(getState(), orderType, isLoadMore)) {
      return dispatch(fetchOrders(orderType, isLoadMore));
    } else {
      return Promise.resolve();
    }
  }
}
