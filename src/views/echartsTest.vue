<template>
  <div>
    <button class="btnOne" @click="drawLineBtn('btnOne')">按钮1</button>
    <button class="btnTwo" @click="drawLineBtn('btnTwo')">按钮2</button>
    <button class="btnThree" @click="drawLineBtn('btnThree')">按钮3</button>
    <button @click="getPic">截屏</button>
    <div class="echarts-box" ref="echartsBox"></div>
    <img src="" alt="" ref="picShow" />
  </div>
</template>

<script>
import echarts from "echarts";
import getBase64 from "@/common/canvasShot";

export default {
  name: "EchartsTest",
  data() {
    return {
      myChart: null,
      symbolSize: 20,
      btnType: "btnOne",
      btnOne: [[0, 0], [1, 1], [null, null], [3, 3], [4, 4]],
      btnTwo: [],
      btnThree: []
    };
  },
  mounted() {
    const _this = this;

    this.myChart = echarts.init(this.$refs.echartsBox);

    this.drawLine();

    this.myChart.getZr().on("click", param => {
      let arr = [];
      const position = [null, null];
      let len = this[this.btnType].length;
      let maxY = len > 0 ? this[this.btnType][len - 1][0] : -1;

      position[0] = param.offsetX;
      position[1] = param.offsetY;

      arr = this.myChart.convertFromPixel("grid", position);

      if (Math.round(arr[0]) < maxY || Math.round(arr[0]) === maxY)
        return false;

      arr[0] = Math.round(arr[0]);

      if (arr[0] % 2 === 1) arr[0] += 1;

      this[this.btnType].push(arr);

      this.drawLine();
      this.dragBtn();
    });

    setTimeout(() => {
      _this.dragBtn();
    }, 0);
  },
  methods: {
    onPointDragging(dataIndex, arr) {
      let myChart = this.myChart;
      const position = [null, null];
      let xNum = this[this.btnType][dataIndex][0];

      position[0] = arr.offsetX;
      position[1] = arr.offsetY;

      this[this.btnType][dataIndex] = myChart.convertFromPixel(
        "grid",
        position
      );
      this[this.btnType][dataIndex][0] = xNum;

      this.dragBtn();
    },

    drawLine() {
      const _this = this;

      this.myChart.setOption({
        xAxis: {
          min: 0,
          max: 50,
          interval: 2,
          type: "value"
        },
        yAxis: [
          {
            min: 0,
            max: 50,
            interval: 2,
            type: "value"
          },
          {
            min: 0,
            max: 50,
            interval: 2,
            type: "value"
          }
        ],
        title: {
          show: false
        },
        animation: false,
        series: [
          {
            id: "a",
            type: "line",
            symbol: "pin",
            symbolSize: _this.symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
            data: _this.btnOne,
            hoverAnimation: false
          },
          {
            id: "b",
            type: "line",
            symbol: "triangle",
            symbolSize: _this.symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
            data: _this.btnTwo,
            hoverAnimation: false
          },
          {
            id: "c",
            type: "line",
            symbol: "triangle",
            symbolSize: _this.symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
            data: _this.btnThree,
            hoverAnimation: false
          }
        ]
      });
    },

    dragBtn() {
      const _this = this;
      const dragArr = _this[this.btnType];

      this.myChart.setOption({
        graphic: echarts.util.map(dragArr, (dataItem, dataIndex) => {
          return {
            type: "circle",
            shape: {
              cx: 0,
              cy: 0,
              r: _this.symbolSize / 2
            },
            invisible: true,
            draggable: true,
            position: _this.myChart.convertToPixel("grid", dataItem),
            z: 3,
            ondrag: echarts.util.curry(_this.onPointDragging, dataIndex)
          };
        }),
        series: [
          {
            id: "a",
            data: _this.btnOne
          },
          {
            id: "b",
            data: _this.btnTwo
          },
          {
            id: "c",
            data: _this.btnThree
          }
        ]
      });
    },

    drawLineBtn(type) {
      this.btnType = type;

      this.myChart.clear();

      this.drawLine();
      this.dragBtn();
    },

    getPic() {
      this.$nextTick(() => {
        getBase64(this.$refs.echartsBox)
          .then(data => {
            this.$refs.picShow.src = data;
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>

<style lang="less" scope>
.echarts-box {
  width: 100vw;
  min-height: 100vh;
}
</style>
