Page({
  //h5传过来的参数
  onLoad: function(options) {
    console.log("webview传过来的参数", options)
    //字符串转对象
    let payData = JSON.parse(options.payDataStr)
    console.log("orderId", payData.orderId)

    let that = this;
    wx.cloud.callFunction({
      name: "pay",
      data: {
        orderId: payData.orderId,
        money: payData.money
      },
      success(res) {
        console.log("获取成功", res)
        that.goPay(res.result);
      },
      fail(err) {
        console.log("获取失败", err)
      }
    })
  },

  //微信支付
  goPay(payData) {
    wx.requestPayment({
      timeStamp: payData.timeStamp,
      nonceStr: payData.nonceStr,
      package: payData.package,
      signType: 'MD5',
      paySign: payData.paySign,
      success(res) {
        console.log("支付成功", res)
        //你可以在这里支付成功以后，再跳会webview页，并把支付成功状态传回去
        wx.navigateTo({
          url: '../webview/webview?payOk=true',
        })
      },
      fail(res) {
        console.log("支付失败", res)
      }
    })
  }
})