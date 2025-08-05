Page({
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selectedPagePath: this.route
      });
    }
  },
    data: {
        moodSelected: false,
        selectedMoodDoll: '',
        moodRating: 5, // Default mood rating
        diaryContent: '',
        diaryImage: '',
        currentDate: '', // Will be set dynamically
        currentMoodIndex: 0,
        moodDolls: [
            { src: 'http://t06x70l63.hn-bkt.clouddn.com/sadDoll01.png' },
            { src: 'http://t06x70l63.hn-bkt.clouddn.com/jingDoll01.png' },
            { src: 'http://t06x70l63.hn-bkt.clouddn.com/sadDoll02.png' },
            { src: 'http://t06x70l63.hn-bkt.clouddn.com/happyDoll01.png' },
            { src: 'https://706c-pms-a02b1a-1321700020.tcb.qcloud.la/mood_dolls/excited.png?sign=a8019323136209511116641620230713&t=1700023071' }
        ],
        moodBackgrounds: [
            'http://t06x70l63.hn-bkt.clouddn.com/dollBackground.png',
            'http://t06x70l63.hn-bkt.clouddn.com/dollBackground02.png',
            'http://t06x70l63.hn-bkt.clouddn.com/dollBackground03.png'
        ],
        backgroundImage: '',
        moodChartData: [7, 8, 6, 9, 7, 8, 10], // Dummy data for mood ratings
        moodChartLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Dummy labels for days
        showSuccessPopup: false,
        philosophyQuote: '',
        philosophyQuotes: [
            "“我们不是人类在经历精神体验，而是精神存在在经历人类体验。” - Pierre Teilhard de Chardin",
            "“未经审视的人生不值得过。” - 苏格拉底",
            "“唯一真正的智慧是知道自己一无所知。” - 苏格拉底",
            "“幸福不是现成的东西。它来自你自己的行动。” - 达赖喇嘛",
            "“生活就像骑自行车。为了保持平衡，你必须不断前进。” - 阿尔伯特·爱因斯坦"
        ]
    },

    onLoad: function () {
        this.setCurrentDate();
        this.setRandomBackground();
        // Set a default mood doll to be displayed initially
        if (this.data.moodDolls.length > 0) {
            this.setData({
                selectedMoodDoll: this.data.moodDolls[0].src
            });
        }
    },

    onReady() {

    },

    onShow() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selectedPagePath: this.route
        });
      }
    },

    onUnload() {

    },

    setCurrentDate: function () {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        this.setData({
            currentDate: `${year}年${month}月${day}日`
        });
    },

    setRandomBackground: function () {
        const backgrounds = this.data.moodBackgrounds;
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        this.setData({
            backgroundImage: backgrounds[randomIndex]
        });
    },

    onSwiperChange: function (e) {
        this.setData({
            currentMoodIndex: e.detail.current
        });
    },

    selectMood: function (e) {
        const moodIndex = e.currentTarget.dataset.moodIndex;
        console.log('Selected Mood Index:', moodIndex);
        // Here you can add logic to handle the selected mood, e.g., navigate to a detail page or show a form.
        this.setData({
            moodSelected: true,
            selectedMoodDoll: this.data.moodDolls[moodIndex].src
        });
    },

    onMoodRatingChange: function (e) {
        this.setData({
            moodRating: e.detail.value
        });
        console.log('Mood Rating changed:', this.data.moodRating);
    },

    onDiaryInput: function (e) {
        this.setData({
            diaryContent: e.detail.value
        });
        console.log('Diary input:', this.data.diaryContent);
    },

    onUploadImage: function () {
        const that = this;
        wx.chooseImage({
            count: 1, // Only allow one image
            sizeType: ['compressed'], // Compressed images
            sourceType: ['album', 'camera'], // From album or camera
            success(res) {
                // tempFilePath can be used as the image src
                const tempFilePath = res.tempFilePaths[0];
                that.setData({
                    diaryImage: tempFilePath
                });
                console.log('Image selected:', tempFilePath);
                // Here you would typically upload the image to a server
                // wx.uploadFile({
                //   url: 'YOUR_UPLOAD_URL',
                //   filePath: tempFilePath,
                //   name: 'file',
                //   success(res) {
                //     const data = res.data
                //     // Do something with the upload result
                //   }
                // })
            },
            fail(err) {
                console.error('Image selection failed:', err);
            }
        });
    },

    saveMood: function () {
        // Here you would typically save the data to a server or local storage
        console.log('Saving mood:', {
            mood: this.data.selectedMoodDoll,
            rating: this.data.moodRating,
            diary: this.data.diaryContent,
            image: this.data.diaryImage
        });

        const randomIndex = Math.floor(Math.random() * this.data.philosophyQuotes.length);
        const selectedQuote = this.data.philosophyQuotes[randomIndex];

        this.setData({
            showSuccessPopup: true,
            philosophyQuote: selectedQuote
        });
    },

    hideSuccessPopup: function () {
        this.setData({
            showSuccessPopup: false
        });
        // Reset the page to the initial state after a short delay to allow the popup to fade out
        setTimeout(() => {
            this.setData({
                moodSelected: false,
                diaryContent: '',
                diaryImage: '',
                moodRating: 5, // Reset to default
            });
            this.setRandomBackground(); // Also reset the background for a fresh start
        }, 500); // Match the animation duration
    }
});