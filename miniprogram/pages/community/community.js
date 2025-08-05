// miniprogram/pages/community/community.js
Page({

  /**
   * Page initial data
   */
  data: {
    // 每周主题
    weeklyTopic: {
      tag: '不确定性',
      title: '我们应该如何与不确定性共处？',
      description: '现代生活充满了变化与未知，从职业发展到人际关系，不确定性似乎无处不在。你是如何看待和应对生活中的不确定性的？',
      participants: 128
    },
    // 帖子列表
    posts: [
      {
        id: 1,
        avatar: 'https://img.ixintu.com/download/jpg/201912/d4821665c40bdccd4a6b19e6ef496f9a.jpg!ys',
        nickname: '迷路的星星',
        content: '以前总想把一切都规划好，但后来发现，人生最大的魅力恰恰在于它的不可预测。学会拥抱不确定性，反而让我轻松了很多。',
        time: '2小时前',
        embraces: 23,
        comments: 5
      },
      {
        id: 2,
        avatar: 'https://s1.aigei.com/src/img/png/57/5763a3015b74488fb693cd3c4980005a.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:BDKQP-F3YL9LGsgJtGQQLG1_KOc=',
        nickname: '深海的鱼',
        content: '不确定性让我感到非常焦虑。我习惯于掌控一切，失控的感觉太糟糕了。大家有什么好方法吗？',
        time: '3小时前',
        embraces: 45,
        comments: 12
      },
      {
        id: 3,
        avatar: 'https://s1.aigei.com/prevfiles/f7f1fea7faef4185b4b8f6ce24b0d937.png?e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:jEg70uwtmNsdA7WHHYXDgpCrKJY=',
        nickname: '行走的哲学书',
        content: '萨特说“我们是自由的，我们是选择”。不确定性正是自由的代价和证明。接受它，就是接受我们作为人的本质。',
        time: '5小时前',
        embraces: 18,
        comments: 3
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  /**
   * 跳转到发布帖子页面
   */
  navigateToPostCreation() {
    wx.navigateTo({
      url: '/pages/post-creation/post-creation' // 假设发布页面的路径
    });
  },

  /**
   * 跳转到AI哲思伙伴页面
   */
  navigateToAIPartner() {
    wx.navigateTo({
      url: '/pages/ai-partner/ai-partner' // 假设AI伙伴页面的路径
    });
  }
})