<template>
  <div style="height: 100%; width: 100%">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
// import { ref, provide } from 'vue'
// echat 图标
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts' // 饼图 条形图
import { GridComponent } from 'echarts/components' // 组件
import { UniversalTransition } from 'echarts/features'
// vue-echat
import VChart, { THEME_KEY } from 'vue-echarts'

//
import { option } from '../data'

use([CanvasRenderer, LineChart, GridComponent, UniversalTransition])

// 主题
// provide([THEME_KEY], 'dark')
</script>

<style lang="scss" scoped></style>
