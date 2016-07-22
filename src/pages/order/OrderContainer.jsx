import React from 'react';

import {Tabs, TabLink, TabContent} from 'react-tabs-redux';

import OrderItem from './components/OrderItem';
import OrderList from './components/OrderList';


// store.dispatch(fetchOrdersIfNeeded('unpay')).then(() =>
//   console.log(store.getState())
// )

require('./styles/order-list.less');

export class OrderApp extends React.Component {

  handleScroll(e) {
    var target = e.target;
    var THRESHOLD = 50;
    if (target.scrollTop + target.clientHeight + THRESHOLD >= target.scrollHeight) {
      var orderType = this.props.selectedTab.orderTabs;
      console.log('loadMore, orderType:', orderType);
      this.props.fetchOrdersIfNeeded(orderType, true);
    }
  }

  render() {
    var tabStyles = {
      width: '100%'
    };

    return <div className="views">
      <div className="view view-main">
        <div className="pages">
          <div className="page">
            <div className="page-content" onScroll={this.handleScroll.bind(this)}>
              <Tabs
                name="orderTabs"
                handleSelect={this.props.switchTabAndRequest}
                selectedTab={this.props.selectedTab.orderTabs}
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
                      <OrderList orders={this.props.ordersByType.unpay && this.props.ordersByType.unpay.items || []} />
                    </TabContent>
                    <TabContent for="all" style={tabStyles}>
                      <OrderList orders={this.props.ordersByType.all && this.props.ordersByType.all.items || []} />
                    </TabContent>
                    <TabContent for="completed" style={tabStyles}>
                      <OrderList orders={this.props.ordersByType.completed && this.props.ordersByType.completed.items || []} />
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
};

function mapStateToProps(state) {
  return state;
}


import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orderActions from '../../actions/order-actions';
export default connect(state => ({
    state: state.order
  }),
  (dispatch) => ({
    actions: bindActionCreators(orderActions, dispatch)
  })
)(OrderApp);
