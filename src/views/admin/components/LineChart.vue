<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "600px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    dataAnalysis: function() {
      return this.$store.state.dataAnalysis;
    },
  },
  mounted() {
    this.initChart();
    this.$store.dispatch("getDataAnalysis", {
      today: this.$moment()
        .tz("Asia/Shanghai")
        .format("MMDD"),
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    formatDate() {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        arr.push(
          this.$moment()
            .subtract(i, "days")
            .tz("Asia/Shanghai")
            .format("YYYY-MM-DD")
        );
      }
      return arr.reverse();
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));

      this.chart.setOption({
        backgroundColor: "#304156",
        title: {
          top: 20,
          text: "后台信息统计",
          textStyle: {
            fontWeight: "normal",
            fontSize: 18,
            color: "#F1F1F3",
          },
          left: "2%",
        },
        //hover的线
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B",
            },
          },
        },
        legend: {
          top: 20,
          icon: "rect",
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ["每日订单数", "每日会员登录数", "每日会员注册数"],
          right: "4%",
          textStyle: {
            fontSize: 14,
            color: "#F1F1F3",
          },
        },
        grid: {
          top: 100,
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#57617B",
              },
            },
            data: this.formatDate(),
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#57617B",
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
              },
            },
            splitLine: {
              lineStyle: {
                color: "#57617B",
              },
            },
          },
        ],
        series: [
          {
            name: "每日订单数",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(219, 50, 51, 0.3)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(219, 50, 51, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(219,50,51)",
                borderColor: "rgba(219,50,51,0.2)",
                borderWidth: 12,
              },
            },
            data: this.dataAnalysis.newOrder,
          },
          {
            name: "每日会员登录数",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 136, 212, 0.3)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 136, 212, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(0,136,212)",
                borderColor: "rgba(0,136,212,0.2)",
                borderWidth: 12,
              },
            },
            data: this.dataAnalysis.activeUser,
          },
          {
            name: "每日会员注册数",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(137, 189, 27, 0.3)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(137, 189, 27, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(137,189,27)",
                borderColor: "rgba(137,189,2,0.27)",
                borderWidth: 12,
              },
            },
            data: this.dataAnalysis.newUser,
          },
        ],
      });
    },
  },
};
</script>
