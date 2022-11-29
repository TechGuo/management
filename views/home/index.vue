<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 10px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <hr />
        <div class="login-info">
          <p>上次登录时间：<span>2022-05-20</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLable"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{
            display: 'flex',
            padding: 0,
          }"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num1">¥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="lineChart" style="height: 280px">
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getStatic } from "../../api/data.js";
import * as echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      userImg: require("../../src/images/T1.jpg"),
      tableData: [],
      tableLable: {
        name: "课程",
        todayBuy: "当日购买",
        monthBuy: "当月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getStatic().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;

      //基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      //指定图表的配置项和数据
      var echarts1Option = {};
      //处理数据项xAxis 即横坐标
      const { orderData, userData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1Option.xAxis = { data: orderData.date };
      echarts1Option.yAxis = {};

      echarts1Option.legend = xAxisData;
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      //使用指定的配置项和数据显示图表
      echarts1.setOption(echarts1Option);

      //下面是柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      var echarts2Option = {
        legend: {
          //图例文字颜色
          texttype: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        //提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };

      echarts2.setOption(echarts2Option);
      const { videoData } = data.data;
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: videoData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>
<style lang="less" scoped>
.user {
  display: flex;
  justify-content: left;

  padding: 5px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .userInfo {
    .name {
      font-size: 24px;
      margin-bottom: 5px;
    }
    .access {
      margin-top: 5px;
      font-size: 12px;
      color: grey;
    }
  }
}
.login-info {
  p {
    font-size: 14px;
    color: grey;
  }
  span {
    margin-left: 20px;
  }
}
/* ----------------------------------  */

.num {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  .el-card {
    height: 60px;
    width: 32%;
    margin-bottom: 5px;
  }
  .icon {
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: white;
  }
  .detail {
    margin-left: 20px;
    .num1 {
      font-size: 20px;
      margin: 5px 0;
    }
    .txt {
      margin-top: 0;
      font-size: 12px;
      color: grey;
    }
  }
}
.lineChart {
  margin-top: 10px;
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
  }
}
</style>>

