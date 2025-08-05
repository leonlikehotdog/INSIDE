Component({
  properties: {
    chartData: Array,
    chartLabels: Array
  },

  data: {
    canvasWidth: 300,
    canvasHeight: 200,
    tooltip: {
      visible: false,
      x: 0,
      y: 0,
      value: ''
    },
    pointPositions: []
  },

  lifetimes: {
    ready() {
      this.getCanvasSize();
    }
  },

  methods: {
    getCanvasSize() {
      this.createSelectorQuery()
        .select('.mood-line-chart')
        .boundingClientRect(res => {
          if (res) {
            this.setData({
              canvasWidth: res.width,
              canvasHeight: res.height
            });
            this.drawChart();
          }
        })
        .exec();
    },

    drawChart() {
      const { chartData, chartLabels } = this.properties;
      const { canvasWidth, canvasHeight } = this.data;
      const ctx = wx.createCanvasContext('moodLineChart', this);

      const padding = 20;
      const chartWidth = canvasWidth - 2 * padding;
      const chartHeight = canvasHeight - 2 * padding - 30;

      const minVal = Math.min(...chartData);
      const maxVal = Math.max(...chartData);
      const range = maxVal - minVal || 1;

      const pointPositions = [];

      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Axes
      ctx.setStrokeStyle('#ccc');
      ctx.setLineWidth(1);
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, padding + chartHeight);
      ctx.moveTo(padding, padding + chartHeight);
      ctx.lineTo(padding + chartWidth, padding + chartHeight);
      ctx.stroke();

      // Gradient line
      const gradient = ctx.createLinearGradient(padding, 0, padding + chartWidth, 0);
      gradient.addColorStop(0, '#6a82fb');
      gradient.addColorStop(1, '#fc5c7d');
      ctx.setStrokeStyle(gradient);
      ctx.setLineWidth(3);
      ctx.beginPath();

      chartData.forEach((value, index) => {
        const x = padding + (index / (chartData.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((value - minVal) / range) * chartHeight;
        pointPositions.push({ x, y, value });

        index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });

      ctx.stroke();

      // Labels
      ctx.setFontSize(10);
      ctx.setFillStyle('#666');
      ctx.setTextAlign('center');

      chartLabels.forEach((label, index) => {
        const x = padding + (index / (chartLabels.length - 1)) * chartWidth;
        ctx.fillText(label, x, padding + chartHeight + 15);
      });

      ctx.setTextAlign('right');
      ctx.fillText(maxVal.toFixed(0), padding - 5, padding + 5);
      ctx.fillText(minVal.toFixed(0), padding - 5, padding + chartHeight);

      ctx.draw();

      this.setData({ pointPositions });
    },

    handleTouch(e) {
      const touchX = e.touches[0].x;
      const touchY = e.touches[0].y;
      const radius = 12;
      const point = this.data.pointPositions.find(pt => {
        return Math.abs(pt.x - touchX) <= radius && Math.abs(pt.y - touchY) <= radius;
      });

      if (point) {
        this.setData({
          tooltip: {
            visible: true,
            x: point.x,
            y: point.y,
            value: point.value
          }
        });
      } else {
        this.setData({ tooltip: { visible: false } });
      }
    }
  }
});
