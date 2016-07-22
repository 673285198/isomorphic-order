import React from 'react';

export default class OrderFooter extends React.Component {
  render() {
    return <div className="line">
        <span className="left">订单总额：<strong>{this.props.order.receiveTotalAmount}</strong></span>
        <span className="right">
          <button type="button" className="button small-button delivery-info-btn">查看物流</button>
        </span>
      </div>
  }
}