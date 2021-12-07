<template>
  <div class="echart-bar">
    <v-chart class="chart" :option="optionBar" autoresize />
  </div>
</template>

<script setup>
// import { ref, provide } from 'vue'
// echat 图标
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components' // 组件
import { BarChart } from 'echarts/charts' // 条形图
// vue-echat
import VChart from 'vue-echarts'
//
import { optionBar } from '../data'

use([CanvasRenderer, GridComponent, BarChart])
</script>

<style lang="scss" scoped>
.echart-bar {
  height: 100%;
  width: 100%;
}
</style>
