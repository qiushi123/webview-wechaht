const cloud = require('wx-server-sdk')
cloud.init()

//1，引入依赖
const tenpay = require('tenpay');

//2，配置参数
const config = {
  appid: '你的小程序appid',//小程序appid
  mchid: '你的微信支付的商户号',//微信支付的商户号
  partnerKey: '你的微信支付的商户密匙',//微信支付的商户密匙
  notify_url: 'https://mp.weixin.qq.com',//回调地址，可以随便写一个
  spbill_create_ip: '127.0.0.1'//这里就写127.0.0.1就行了
};

exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  //订单数据
  let {
    orderId,
    money
  } = event;
  //3,初始化
  const api = tenpay.init(config);

  //4，获取支付参数
  let result = await api.getPayParams({
    out_trade_no: orderId,
    body: '商品简单描述',
    total_fee: money,
    openid: wxContext.OPENID
  });
  return result
}