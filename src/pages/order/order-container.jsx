import React from 'react';
import {Tabs, TabLink, TabContent} from 'react-tabs-redux';

import OrderList from './components/OrderList';

import fetch from 'isomorphic-fetch';

require('./styles/order-list.less');

export class OrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.tabTypeMap = {
      unpay: 1,
      all: 0,
      completed: 2
    }
  }

  handleScroll = (e) => {
    let target = e.target;
    let THRESHOLD = 50;
    if (target.scrollTop + target.clientHeight + THRESHOLD >= target.scrollHeight) {
      let orderType = this.props.state.selectedTab.orderTabs;
      console.log('loadMore, orderType:', orderType);
      this.props.fetchOrdersIfNeeded(orderType, true);
    }
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.fetchOrdersIfNeeded('all');
  }

  render() {
    let tabStyles = {
      width: '100%'
    };

    const { state, actions } = this.props;

    return <div className="views">
      <div className="view view-main">
        <div className="pages">
          <div className="page">
            <div className="page-content" onScroll={this.handleScroll}>
              <Tabs
                name="orderTabs"
                handleSelect={this.switchTabAndRequest}
                selectedTab={state.selectedTab.orderTabs}
              >
                <div className="content-block header-tabs">
                  <div className="buttons-row">
                    <div className="tab-link button">
                      <TabLink to="unpay">待支付</TabLink>
                    </div>
                    <div className="tab-link button">
                      <TabLink to="all">全部</TabLink>
                    </div>
                    <div className="tab-link button">
                      <TabLink to="completed">已完成</TabLink>
                    </div>
                  </div>
                </div>
                 <div className="tabs-animated-wrap">
                  <div className="tabs">
                    <TabContent for="unpay" style={tabStyles}>
                      <OrderList orders={state.ordersByType.unpay && state.ordersByType.unpay.items || []} />
                    </TabContent>
                    <TabContent for="all" style={tabStyles}>
                      <OrderList orders={state.ordersByType.all && state.ordersByType.all.items || []} />
                    </TabContent>
                    <TabContent for="completed" style={tabStyles}>
                      <OrderList orders={state.ordersByType.completed && state.ordersByType.completed.items || []} />
                    </TabContent>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  shouldFetchOrders = (orderType, isLoadMore) => {
    const orders = this.props.state.ordersByType[orderType];

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

  fetchOrders = (orderType, isLoadMore) => {
    this.props.actions.requestOrders(orderType, isLoadMore);

    let tabType = this.tabTypeMap[orderType];
    let pageNumber = 1;
    var orderData;

    // 获取页数
    if (isLoadMore) {
      orderData = this.props.state.ordersByType[orderType];
      pageNumber = orderData.pageNum + 1;
    }

    fetch(`http://order.api.cfcmu.cn/member/order/orderList.json?tabType=${tabType}&pageNumber=${pageNumber}&pageSize=8`, {
        credentials: 'include'
      })
      .then(response => {
        if (response.status === 401) {
          alert('Oops, you are not authorized.');
          this.props.actions.requestOrdersFailed(orderType);
        } else {
          return response.json();
        }
      })
      .then(json =>
        this.props.actions.receiveOrders(orderType, json, pageNumber)
      ).catch(function(e) {
        console.log(e);
      });
  }

  switchTabAndRequest = (selectedTab, tabNamespace) => {
    this.props.actions.changeSelectedTab(selectedTab, tabNamespace);
    this.fetchOrdersIfNeeded(selectedTab);
  }

  fetchOrdersIfNeeded = (orderType, isLoadMore) => {
    if (this.shouldFetchOrders(orderType, isLoadMore)) {
      this.fetchOrders(orderType, isLoadMore);
    }
  }
};


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderActions from '../../actions/order-actions';
export default connect(state => ({
    state: state.order
  }),
  (dispatch) => ({
    actions: bindActionCreators(orderActions, dispatch)
  })
)(OrderApp);
