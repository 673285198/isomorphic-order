import React from 'react';
import ReactDOM from 'react-dom';
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './order/orderReducers';
import {OrderContainer} from './order/OrderContainer';
import thunkMiddleware from 'redux-thunk'
import {fetchOrders, fetchOrdersIfNeeded} from './order/orderActions';


const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// const store = createStoreDevTools(rootReducer, );

const store = createStore(rootReducer, {}, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


// store.dispatch({
//   type: 'SET_STATE',
//   state: {
//     unpayList: [
//     ],
//     allList: [{"proName":"宝丽来（Polaroid） z2300 拍立得相机 白色","productImgUrl":"http://img13.360buyimg.com/n1/g14/M07/0B/00/rBEhV1INv8MIAAAAAADruqaso_AAACJ0AHKOr0AAOvS494.jpg","proNums":1,"orderId":"2016052500001535","placeorderTime":1464158139000,"price":"1490.00","firstPay":"0.00","oncePercent":0,"installmentMonths":"0","monthsInstallment":"0.00","orderStatus":"0","receiveTime":null,"logisticsInfo":"未发货","deliveryCropName":null,"deliveryCorpId":null,"shippingNo":null,"deliveryAddress":"北京市东城区狗狗你也一样","productAmount":"1490.00","receiveTotalAmount":"1496.00","receiveFreightAmount":"6.00","receiveProductAmount":"1490.00","handlingCharge":"0.00","installTotalInterest":null,"productDesc":"","consigneeMobile":"13612384411","consigneeName":"哦尼莫","installmentRepayAmount":"0.00","returnStatus":"0","logistics":false,"discountPrice":"0.00","schoolId":null,"productId":2016022500000001,"contractId":0,"merchantId":101,"merchantName":"京东","productCategoryId":3102102,"activityCategoryId":6,"orderType":"6","virtualOrderType":null,"virtualOrder":false,"haveInvoice":false,"invoiceTitle":null,"invoiceContent":null,"invoiceType":null,"discountRule":null,"tradingScence":null,"return":false},{"proName":"AKG Y55 便携式头戴耳机 手机通话耳机 蓝色","productImgUrl":"http://img13.360buyimg.com/n1/jfs/t631/98/1093265049/85368/3ef2866f/54ae25dcN949e7d34.jpg","proNums":1,"orderId":"2016051900003874","placeorderTime":1463659145000,"price":"950.00","firstPay":"0.00","oncePercent":0,"installmentMonths":"1","monthsInstallment":"956.00","orderStatus":"4","receiveTime":null,"logisticsInfo":"未发货","deliveryCropName":"未知","deliveryCorpId":0,"shippingNo":"XXXXXXXX","deliveryAddress":"北京市东城区狗狗你也一样","productAmount":"950.00","receiveTotalAmount":"956.00","receiveFreightAmount":"6.00","receiveProductAmount":"950.00","handlingCharge":"0.00","installTotalInterest":null,"productDesc":"","consigneeMobile":"13612384411","consigneeName":"哦尼莫","installmentRepayAmount":"956.00","returnStatus":"0","logistics":true,"discountPrice":"0.00","schoolId":null,"productId":2015070800004676,"contractId":0,"merchantId":101,"merchantName":"京东","productCategoryId":3102202,"activityCategoryId":51,"orderType":"6","virtualOrderType":null,"virtualOrder":false,"haveInvoice":false,"invoiceTitle":null,"invoiceContent":null,"invoiceType":null,"discountRule":null,"tradingScence":null,"return":true},{"proName":"AKG Y55 便携式头戴耳机 手机通话耳机 蓝色","productImgUrl":"http://img13.360buyimg.com/n1/jfs/t631/98/1093265049/85368/3ef2866f/54ae25dcN949e7d34.jpg","proNums":1,"orderId":"2016051900003824","placeorderTime":1463659139000,"price":"950.00","firstPay":"0.00","oncePercent":0,"installmentMonths":"0","monthsInstallment":"0.00","orderStatus":"0","receiveTime":null,"logisticsInfo":"未发货","deliveryCropName":null,"deliveryCorpId":null,"shippingNo":null,"deliveryAddress":"北京市东城区狗狗你也一样","productAmount":"950.00","receiveTotalAmount":"956.00","receiveFreightAmount":"6.00","receiveProductAmount":"950.00","handlingCharge":"0.00","installTotalInterest":null,"productDesc":"","consigneeMobile":"13612384411","consigneeName":"哦尼莫","installmentRepayAmount":"0.00","returnStatus":"0","logistics":false,"discountPrice":"0.00","schoolId":null,"productId":2015070800004676,"contractId":0,"merchantId":101,"merchantName":"京东","productCategoryId":3102202,"activityCategoryId":51,"orderType":"6","virtualOrderType":null,"virtualOrder":false,"haveInvoice":false,"invoiceTitle":null,"invoiceContent":null,"invoiceType":null,"discountRule":null,"tradingScence":null,"return":false},{"proName":"爱施德测试商品","productImgUrl":"http://10.75.201.81/product/20151203/40b21e63fab44987ba6c54ba42c915a5.jpg","proNums":1,"orderId":"2016051300005066","placeorderTime":1463145973000,"price":"2100.00","firstPay":"0.00","oncePercent":0,"installmentMonths":"0","monthsInstallment":"0.00","orderStatus":"0","receiveTime":null,"logisticsInfo":"未发货","deliveryCropName":null,"deliveryCorpId":null,"shippingNo":null,"deliveryAddress":"北京市东城区狗狗你也一样","productAmount":"2100.00","receiveTotalAmount":"2100.00","receiveFreightAmount":"0.00","receiveProductAmount":"2100.00","handlingCharge":"0.00","installTotalInterest":null,"productDesc":"渠道:爱施德第三方","consigneeMobile":"13612384411","consigneeName":"哦尼莫","installmentRepayAmount":"0.00","returnStatus":"0","logistics":false,"discountPrice":"0.00","schoolId":null,"productId":2015120300000001,"contractId":0,"merchantId":30015,"merchantName":"爱施德公司","productCategoryId":3101101,"activityCategoryId":6,"orderType":"3","virtualOrderType":null,"virtualOrder":false,"haveInvoice":false,"invoiceTitle":null,"invoiceContent":null,"invoiceType":null,"discountRule":null,"tradingScence":null,"return":false},{"proName":"爱施德测试商品","productImgUrl":"http://10.75.201.81/product/20151203/40b21e63fab44987ba6c54ba42c915a5.jpg","proNums":1,"orderId":"2016051300004988","placeorderTime":1463145962000,"price":"2100.00","firstPay":"0.00","oncePercent":0,"installmentMonths":"0","monthsInstallment":"0.00","orderStatus":"0","receiveTime":null,"logisticsInfo":"未发货","deliveryCropName":null,"deliveryCorpId":null,"shippingNo":null,"deliveryAddress":"北京市东城区狗狗你也一样","productAmount":"2100.00","receiveTotalAmount":"2100.00","receiveFreightAmount":"0.00","receiveProductAmount":"2100.00","handlingCharge":"0.00","installTotalInterest":null,"productDesc":"渠道:爱施德第三方","consigneeMobile":"13612384411","consigneeName":"哦尼莫","installmentRepayAmount":"0.00","returnStatus":"0","logistics":false,"discountPrice":"0.00","schoolId":null,"productId":2015120300000001,"contractId":0,"merchantId":30015,"merchantName":"爱施德公司","productCategoryId":3101101,"activityCategoryId":6,"orderType":"3","virtualOrderType":null,"virtualOrder":false,"haveInvoice":false,"invoiceTitle":null,"invoiceContent":null,"invoiceType":null,"discountRule":null,"tradingScence":null,"return":false}],
//     completeList: [
//     ],
//     orderTabs: null
//   }
// });

// store.dispatch();
store.dispatch(fetchOrdersIfNeeded('unpay')).then(() =>
  console.log(store.getState())
)

require('./styles/framework7.ios.custom.css');
require('./styles/basic.less');

ReactDOM.render(
  <Provider store={store}>
    <OrderContainer />
  </Provider>,
  document.getElementById('app')
);
