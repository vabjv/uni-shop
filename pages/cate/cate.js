// pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wh: 0,
    active: 0, //当前选中项的下标
    scrollTop: 0,
    cateList: [], 
    cateList2: []
  },

  getCateList: function() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      method: 'GET',
      success: (res) => {
        this.setData({
          cateList: res.data.message,
          cateList2: res.data.message[0].children
        });
      }, 
      fail: () => {
        wx.$showMsg();
      }
    })
  },

  cateChanged: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      active: index,
      scrollTop: 0,
      cateList2: this.data.cateList[index].children //this后面一定要加data
    });
  }, 

  cateTapHandler: function(e) {
    const item = e.currentTarget.dataset.item;
    console.log(e);
    wx.navigateTo({
      url: `/subpkg/pages/goods_list/goods_list?cid=${item.cat_id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const sysInfo = wx.getWindowInfo();
    this.setData({
      wh: sysInfo.windowHeight
    });
    this.getCateList();
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