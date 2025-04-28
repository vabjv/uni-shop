// subpkg/pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryObj: {
      query: '',
      cid: '',
      pagenum: 1,
      pagesize: 10
    },
    goodsList: [],
    total: 0,
    isLoding: false
  },

  getGoodsList: function(cb) {
    this.setData({
      isLoding: true
    })
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      method: "GET",
      data: this.data.queryObj,
      success: (res) => {
        this.setData({
          goodsList: [...this.data.goodsList, ...res.data.message.goods],
          total: res.data.message.total,
          isLoding: false
        })
        cb&&cb()
      },
      fail: () => {
        wx.$showMsg()
      }
    })
  },

  gotoDetail: function(e) {
    const goods = e.currentTarget.dataset.goods
    wx.navigateTo({
      url: `/subpkg/pages/goods_detail/goods_detail?goods_id=${goods.goods_id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 这种赋值方式是错误的，相当于把queryObj变成了一个新的结构体
    // this.setData({
    //   queryObj: {
    //     query: options.query || '',
    //     cid: options.cid || ''
    //   }
    // })
    this.setData({
      'queryObj.query': options.query || '',
      'queryObj.cid': options.cid || '',
    })
    this.getGoodsList()
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
    this.setData({
      'queryObj.pagenum': 1,
      goodsList: [],
      isLoding: false
    })
    this.getGoodsList(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.pagenum * this.data.pagesize >= this.data.total) 
      return 
    if (this.data.isLoding) 
      return
    this.setData({
      'queryObj.pagenum': this.data.queryObj.pagenum + 1
    })
    this.getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})