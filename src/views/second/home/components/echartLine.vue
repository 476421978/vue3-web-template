<template>
  <div class="echart-bar">
    <v-chart class="chart" :option="optionLine" autoresize />
  </div>
</template>

<script setup>
// import { ref, provide } from 'vue'
// echat 图标
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'

// vue-echat
import VChart from 'vue-echarts'
//
import { optionLine } from '../data'

use([
  CanvasRenderer,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  UniversalTransition
])
</script>

<style lang="scss" scoped>
.echart-bar {
  height: 100%;
  width: 100%;
}
</style>
