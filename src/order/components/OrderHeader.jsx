import React from 'react';

export default class OrderHeader extends React.Component {

  convertOrderStatus(order) {
    var returnStatus = order.returnStatus;
    var orderStatus = order.orderStatus;
    var statusStr;

    if (returnStatus != '0') {
      if (returnStatus == 1) {
        statusStr = '已退货';
      } else if (returnStatus == 2) {
        statusStr = '退货审核中';
      } else if (returnStatus == 3) {
        statusStr = '待退货';
      } else if (returnStatus == 4) {
        statusStr = '退货确认中';
      } else if (returnStatus == 5) {
        statusStr = '退货审核失败';
      } else if (returnStatus == 6) {
        statusStr = '退货失败';
      }
    } else if (orderStatus) {
      if (orderStatus == 0) {
        statusStr = '已取消';
      } else if (orderStatus == 1) {
        statusStr = '未支付';
      } else if (orderStatus == 2) {
        statusStr = '已处理';
      } else if (orderStatus == 3) {
        statusStr = '待审核';
      } else if (orderStatus == 4) {
        statusStr = '待发货';
      } else if (orderStatus == 5) {
        statusStr = '已发货';
      } else if (orderStatus == 6) {
        statusStr = '已签收';
      } else if (orderStatus == 7) {
        statusStr = '已完成'
      } else if (order.orderStatus == 8) {
        statusStr = '已退款';
      } else if (orderStatus == 9) {
        statusStr = '退货失败';
      } else if (orderStatus == 10) {
        statusStr = '部分退款';
      } 
    }

    return statusStr;
  }

  render() {
    return <div className="line">
      <span className="left">
        {this.props.order.merchantName + '订单'}
      </span>
      <span className="right">
        {this.convertOrderStatus(this.props.order)}
      </span>
    </div>
  }
}