// subpkg/pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail: {},
    info: 3
  },

  getGoodsDetail: function(goods_id){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      method: 'Get',
      data: {
        goods_id
      },
      success: (res) => {
        res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.setData({
          goods_detail: res.data.message
        })
      },
      fail: () => {
        wx.$showMsg()
      }
    })
  },

  preview: function(e) {
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: index,
      urls: this.data.goods_detail.pics.map(x => x.pics_big),
    })
  },

  onLeftClick: function(e) {
    if (e.currentTarget.dataset.index) {
      wx.switchTab({
        url: '/pages/cart/cart',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const goods_id = options.goods_id
    this.getGoodsDetail(goods_id)
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