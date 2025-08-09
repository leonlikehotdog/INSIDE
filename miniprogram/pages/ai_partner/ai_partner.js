// miniprogram/pages/ai_partner/ai_partner.js
Page({
  data: {
    messages: [
      {
        role: 'assistant',
        // content: '你好，我是你的AI哲思伙伴，有什么可以帮助你的吗？',
        htmlContent: '我是浪浪山小妖怪，有何贵干？'
      }
    ],
    inputValue: ''
  },

  onLoad: function (options) {

  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  sendMessage: function () {
    if (this.data.inputValue.trim() === '') {
      return;
    }

    const userMessage = {
      role: 'user',
      content: this.data.inputValue,
      htmlContent: this.data.inputValue
    };

    // Add user message and thinking message in one go
    const thinkingMessage = {
      role: 'thinking',
      content: ''
    };
    const messageToSend = this.data.inputValue;
    const newMessages = [...this.data.messages, userMessage, thinkingMessage];

    this.setData({
      messages: newMessages,
      inputValue: ''
    });

    // Send message to the backend
    const app = getApp();
    wx.request({
      url: app.globalData.backendUrl + '/ai/chat',
      // url: 'http://172.20.10.3:8080/ai/chat', // Your backend API endpoint
      method: 'POST',
      data: {
        message: messageToSend
      },
      success: (res) => {
        console.log('完整响应：');
        console.log('完整响应对象：', res);
        console.log('res.data 类型：', typeof res.data);

        let aiResponse;
        if (res.data.code === 200) {
          // Create AI response message from backend response
          aiResponse = {
            role: 'assistant',
            content: res.data.msg,
            htmlContent: res.data.msg
              // 标题处理
              .replace(/^####\s*(.+)$/gm, '<h4>$1</h4>')
              .replace(/^###\s*(.+)$/gm, '<h3>$1</h3>')
              .replace(/\n/g, '<br>')
              // 粗体和斜体
              .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
              // .replace(/\*([^*]+)\*/g, '<em>$1</em>')
              // 分割线
              .replace(/---/g, '<hr>')
              // 有序列表 (数字开头)
              .replace(/^\s*(\d+)\.\s+(.+)$/gm, '<li>$2</li>')
              // 无序列表 (星号或减号开头)
              .replace(/^\s*[\*\-]\s+(.+)$/gm, '<li>$1</li>')
              // 包装连续的列表项
              .replace(/(<li>.*?<\/li>)(\s*<br>\s*<li>.*?<\/li>)*/gs, '<ul>$&</ul>')
              .replace(/<ul>(<li>.*?<\/li>)/gs, '<ul>$1')
              .replace(/(<li>.*?<\/li>)<\/ul>/gs, '$1</ul>')
              // 清理列表中的多余br标签
              .replace(/<ul>(.*?)<\/ul>/gs, function (match, content) {
                return '<ul>' + content.replace(/<br>/g, '') + '</ul>';
              })
              // 代码块
              .replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
              // 行内代码
              .replace(/`([^`]+)`/g, '<code>$1</code>')
          };
        } else {
          // Handle error case
          aiResponse = {
            role: 'assistant',
            content: 'Sorry, an error occurred.'
          };
        }

        // Replace the thinking message with the actual AI response
        const updatedMessages = newMessages.map((msg, index) => {
          if (index === newMessages.length - 1 && msg.role === 'thinking') {
            return aiResponse;
          } else {
            return msg;
          }
        });

        this.setData({
          messages: updatedMessages
        });
      },
      fail: () => {
        // Handle request failure
        const errorResponse = {
          role: 'assistant',
          content: 'Failed to connect to the server.'
        };
        const updatedMessages = newMessages.map((msg, index) => {
          if (index === newMessages.length - 1 && msg.role === 'thinking') {
            return errorResponse;
          } else {
            return msg;
          }
        });
        this.setData({
          messages: updatedMessages
        });
      }
    });
  }
})