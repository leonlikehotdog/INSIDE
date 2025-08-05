Component({
  properties: {},
  data: {
    selectedPagePath: '/pages/home/home',
    list: [
      {
        pagePath: '/pages/home/home',
        iconPath: '/images/tab_home.png',
        text: '首页'
      },
      {
        pagePath: '/pages/mood/mood',
        iconPath: '/images/tab_mood.png',
        text: '心情'
      },
      {
        pagePath: '/pages/assessment/assessment',
        iconPath: '/images/tab_assessment.png',
        text: '测评'
      },
      {
        pagePath: '/pages/profile/profile',
        iconPath: '/images/tab_profile.png',
        text: '我的'
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({
        url
      });
      this.setData({
        selectedPagePath: url
      });
    }
  }
});