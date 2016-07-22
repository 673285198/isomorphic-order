import React from 'react';
import OrderHeader from './OrderHeader';
import OrderBody from './OrderBody';
import OrderFooter from './OrderFooter';

export default class OrderItem extends React.Component {
  render() {
    return <li className="item">
      <OrderHeader {...this.props} />
      <OrderBody {...this.props}></OrderBody>
      <OrderFooter {...this.props}></OrderFooter>
    </li>
  }
}