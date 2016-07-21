import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import OrderItem from './OrderItem';

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return
    <Tabs>
      <div className="content-block header-tabs">
        <div className="buttons-row">
          <div className="tab-link button">
            <TabLink to="tab1">待支付</TabLink>
          </div>
          <div className="tab-link button">
            <TabLink to="tab2">全部</TabLink>
          </div>
          <div className="tab-link button">
            <TabLink to="tab3">已完成</TabLink>
          </div>
        </div>
      </div>

      <div className="tabs-animated-wrap">
        <div className="tabs">
          <TabContent for="tab1" style={tabStyles}>
            <OrderList orders={this.props.unpayList} />
          </TabContent>
          <TabContent for="tab2" style={tabStyles}>
            <OrderList orders={this.props.allList} />
          </TabContent>
          <TabContent for="tab3" style={tabStyles}>
            <OrderList orders={this.props.completeList} />
          </TabContent>
        </div>
      </div>
    </Tabs>
  }
};