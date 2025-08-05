// miniprogram/pages/ai_partner/ai_partner.js
Page({
  data: {
    messages: [
      {
        role: 'assistant',
        content: '你好，我是你的AI哲思伙伴，有什么可以帮助你的吗？'
      }
    ],
    inputValue: ''
  },

  onLoad: function (options) {

  },

  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  sendMessage: function() {
    if (this.data.inputValue.trim() === '') {
      return;
    }

    const userMessage = {
      role: 'user',
      content: this.data.inputValue
    };

    this.setData({
      messages: [...this.data.messages, userMessage],
      inputValue: ''
    });

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: '我正在思考，请稍候...'
      };
      this.setData({
        messages: [...this.data.messages, aiResponse]
      });
    }, 1000);
  }
})