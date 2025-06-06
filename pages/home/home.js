// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },

  gotoSearch: function() {
    wx.navigateTo({
      url: '/subpkg/pages/search/search',
    })
  },

  getSwiperList: function() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      method: "GET",
      success: (res) => {
        this.setData({
          swiperList: res.data.message
        });
      }, 
      fail: () => {
        wx.$showMsg()
      }
    })
  },

  getNavList: function() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      method: 'GET',
      success: (res) => {
        this.setData({
          navList: res.data.message
        });
      }, 
      fail: () => {
        wx.$showMsg();
      }
    })
  }, 

  navTapHandler: function(e) {
    if (e.currentTarget.dataset.item.name == "分类") {
      wx.switchTab({
        url: '/pages/cate/cate',
      })
    }
  },

  getFloorList: function() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      method: 'GET',
      success: (res) => {
        
        this.setData({
          floorList: res.data.message
        });
      }, 
      fail: () => {
        wx.$showMsg();
      }
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})