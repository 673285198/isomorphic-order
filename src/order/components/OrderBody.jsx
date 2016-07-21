import React from 'react';

export default class OrderBody extends React.Component {
  render() {
    return <div className="item-link item-content order-info">
        <div className="item-media"><img src={this.props.order.productImgUrl} /></div>
        <div className="item-inner">
          <div className="item-title-row">
            <div className="item-title">{this.props.order.proName}</div>
          </div>
          <div className="item-text">{this.props.order.productDesc} 数量：{this.props.order.proNums}</div>
        </div>
      </div>
  }
}