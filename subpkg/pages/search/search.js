// subpkg/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: null,
    input: "",
    searchLists: [],
    historyLists: [],
    reverseHistory: []
  },

  getSearchLists: function() {
    if (this.data.input === "") {
      this.setData({
        searchLists: []
      })
      return 
    }

    wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch",
      method: "Get",
      data: {
        query: this.data.input
      },
      success: (res) => {
        this.setData({
          searchLists: res.data.message
        });
        this._saveSearchHistory()// 直接在这里调用有助于实现同步
      },
      fail: () => {
        wx.$showMsg()
      }
    })

  },

  _saveSearchHistory: function() {
    const filteredHistory = this.data.historyLists.filter(
      item => item !== this.data.input
    );
    const newHistory = [...filteredHistory, this.data.input];

    this.setData({
      historyLists: newHistory,
      reverseHistory: [...newHistory].reverse()
    });

    wx.setStorageSync('input', JSON.stringify(this.data.historyLists));
  },

  clearHistory: function(){
    this.setData({
      historyLists: [],
      reverseHistory: []
    })
    wx.setStorageSync('input', []);
  },

  searchHistory: function(e) {
    this.setData({
      input: e.currentTarget.dataset.history
    })
    this.getSearchLists()
  },

  onSearch: function(e) {
    if (!e.detail || e.detail.trim() === "") {
      this.setData({
        input: "",
        searchLists: []
      });
      return;
    }
    clearTimeout(this.data.timer);
    this.setData({
      timer: setTimeout(() => {
        this.setData({
          input: e.detail
        });
        // 这里可以添加实际的搜索逻辑
        this.getSearchLists();
      }, 500)
    });
  },

  onChange: function(e) {
    if (e.detail === "") {
      this.setData({
        input: ""
      })
      this.getSearchLists()
    }
  },

  gotoDetail: function(e) {  
    wx.navigateTo({
      url: `/subpkg/pages/goods_detail/goods_detail?goods_id=${e.currentTarget.dataset.id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const storedHistory = JSON.parse(wx.getStorageSync('input')) || [];
    if (storedHistory) {
      this.setData({
        historyLists: storedHistory,
        reverseHistory: [...storedHistory].reverse()
      });
    }
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