// components/my_search/my_search.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String,
      default: "#ff0000"
    },
    // 圆角尺寸
    radius: {
      type: Number,
      // 单位是 px
      default: 18
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    search: function() {
      this.triggerEvent("gotoSearch")
    }
  }
})