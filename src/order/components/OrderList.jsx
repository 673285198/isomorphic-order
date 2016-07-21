import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import OrderItem from './OrderItem';

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return <div className="tab active">
      <div className="list-block media-list info-list">
        <ul>
          {this.props.orders.map((item, i) => 
            <OrderItem key={item.orderId} order={item} />
          )}
        </ul>
      </div>
    </div>
  }
};