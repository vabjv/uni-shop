// app.js
App({
  onLaunch() {
    wx.$showMsg = function(title = "数据加载失败！", duration = 1500) {
      wx.showToast({
        title,
        duration,
        icon: 'none'
      });
    };
  },
  globalData: {
    userInfo: null
  }
})
