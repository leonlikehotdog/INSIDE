// pages/home/home.js
Page({
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selectedPagePath: this.route
      });
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 每日哲思
    philosophy: {
      text: '我们是自身生命的塑造者，而非被动接受命运的黏土。',
      author: '萨特'
    },
    // 功能导航项
    navItems: [
        { icon: '/images/icon_mood.png', text: '情绪记录', subtitle: '记录每日心情', backgroundColor: '#fde2e2', url: '/pages/mood/mood', backgroundImage: 'http://t06x70l63.hn-bkt.clouddn.com/mood_record.png' },
        { icon: '/images/icon_assessment.png', text: '心理测评', subtitle: '探索真实自我', backgroundColor: '#e2e8fd', url: '/pages/assessment/assessment' },
        { icon: '/images/icon_explore.png', text: '浪浪山妖怪', subtitle: '倾听你的声音', backgroundColor: '#e2fdf2', url: '/pages/ai_partner/ai_partner' ,backgroundImage:'https://gd-hbimg.huaban.com/74a01e8cdfb5229f1af5d9ef7f046a61ee0638dd20a2e-GzcPzf_fw240webp'},
        { icon: '/images/icon_community.png', text: '社区树洞', subtitle: '倾诉与被倾听', backgroundColor: '#fdf8e2', url: '/pages/community/community' },
       
      ],      
    // 推荐内容
    recommendations: [
      {
        image: 'http://t06x70l63.hn-bkt.clouddn.com/rec_article.png',
        title: '文章：如何与内在的焦虑和平共处',
        desc: '学习识别焦虑的信号，并用正念的方法来应对它。',
        type: 'article'
      },
      {
        image: '/images/rec_video.png',
        title: '短片：哲学的慰藉',
        desc: '阿兰·德波顿将带你领略古代智慧如何解决现代烦恼。',
        type: 'video',
        videoUrl: 'http://t06x70l63.hn-bkt.clouddn.com/community.mp4' // 七牛云
      },
      {
        image: '/images/rec_meditation.png',
        title: '冥想：10分钟身体扫描',
        desc: '通过引导式冥想，释放身体的紧张，达到深度放松。',
        type: 'meditation'
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 在页面加载时，可以从服务器API获取动态数据
    // 例如: this.getPhilosophyQuote(); this.getRecommendations();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },



  onUnload() {

  },

  /**
   * 视频播放结束事件
   */
  videoEnded() {
    console.log('视频播放结束');
    // 在这里可以添加视频播放结束后的逻辑，例如：
    // 1. 播放下一个视频
    // 2. 显示相关推荐
    // 3. 记录用户观看行为
  },

  /**
   * 导航到指定页面
   */
  navigateTo(event) {
    const url = event.currentTarget.dataset.url;
    wx.navigateTo({ url });
  }
})
  