import React from 'react';

import {Tabs, TabLink, TabContent} from 'react-tabs-redux';

import OrderList from './components/OrderList';


// store.dispatch(fetchOrdersIfNeeded('unpay')).then(() =>
//   console.log(store.getState())
// )

require('./styles/order-list.less');

export class OrderApp extends React.Component {
  constructor(props) {
    super(props);
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
