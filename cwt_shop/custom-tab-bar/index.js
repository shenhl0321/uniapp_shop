// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedColor: '#FFAD4F',
    color: "#CDCDCD",
    selected: 0,
    
    list: [
      {
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/static/images/tabbar/homepage.png",
        "selectedIconPath": "/static/images/tabbar/homepage-sel.png"
      },
	  {
	    "pagePath": "/pages/category/category",
	    "text": "菜单",
	    "iconPath": "/static/images/tabbar/category.png",
	    "selectedIconPath": "/static/images/tabbar/category-sel.png"
	  },
	  {
	    "pagePath": "/pages/member/member-code",
	    "iconPath": "/static/images/tabbar/99vipcode.png",
		"selectedIconPath": "/static/images/tabbar/99vipcode.png",
		"isSpecial": true
		
	  },
	  {
	    "pagePath": "/pages/home/home",
	    "text": "99VIP",
	    "iconPath": "/static/images/tabbar/99vip.png",
	    "selectedIconPath": "/static/images/tabbar/99vip-sel.png"
	  },
	  
      // {
      //   "pagePath": "/pages/category/category",
      //   "text": "分类",
      //   "iconPath": "/images/tabbar/category.png",
      //   "selectedIconPath": "/images/tabbar/category-sel.png"
      // },
      {
        "pagePath": "/pages/user-new/user-new",
        "text": "我的",
        "iconPath": "/static/images/tabbar/user.png",
        "selectedIconPath": "/static/images/tabbar/user-sel.png"
      }
    ]
  },

  // lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  //   attached: function() {  
  //     let currentBar = this.getTabBar()
  //     console.log(currentBar);
      
  //   },
  //   moved: function (){},
  //   detached: function(){},
  // },


  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
       console.log(data);
      const url = data.path
      
      
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
      // console.log(this.data.selected);
      
    }
  }
})
 