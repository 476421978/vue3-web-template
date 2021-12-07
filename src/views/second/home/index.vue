<template>
  <div class="setting">
    <div style="padding: 20px; background-color: #ececec">
      <a-row :gutter="16">
        <template v-for="(item, index) in dataList" :key="item.title">
          <a-col v-if="index === 0 || index === 1" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <a-card :headStyle="headStyle" :title="item.title" size="small">
              <template #extra><ExclamationCircleOutlined /></template>

              <div class="chart-card-content">
                <h2>{{ item.data }}</h2>
                <div>较昨日新增：{{ item.extra.data }} <ArrowUpOutlined style="color: red" /></div>
                <div>较上周新增：{{ item.extra.data1 }} <ArrowDownOutlined style="color: green" /></div>
              </div>
              <a-divider type="horizontal" class="margin-tb-sm" />
              <div class="flex justify-between">
                <span>{{ item.bottomTitle }}</span>
                <span>{{ item.totalSum }}</span>
              </div>
            </a-card>
          </a-col>
          <a-col v-if="index === 2" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <a-card :headStyle="headStyle" :title="item.title" size="small">
              <template #extra><ExclamationCircleOutlined /></template>
              <div class="chart-card-content">
                <h2>{{ item.data }}</h2>
                <a-progress :percent="item.extra.data" />
              </div>
              <a-divider type="horizontal" class="margin-tb-sm" />
              <div class="flex justify-between">
                <span>{{ item.bottomTitle }}</span>
                <span>{{ item.totalSum }}</span>
              </div>
            </a-card>
          </a-col>
          <a-col v-if="index === 3" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <a-card :headStyle="headStyle" :title="item.title" size="small">
              <template #extra><ExclamationCircleOutlined /></template>
              <div class="chart-card-content">
                <h2>{{ item.data }}</h2>
                <EchartLine />
              </div>
              <a-divider type="horizontal" class="margin-tb-sm" />
              <div class="flex justify-between">
                <span>{{ item.bottomTitle }}</span>
                <span>{{ item.totalSum }}</span>
              </div>
            </a-card>
          </a-col>
        </template>
      </a-row>
    </div>

    <div class="bar">
      <a-card :loading="loading" :bordered="false" :body-style="{ padding: '0' }">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }">
          <template #tabBarExtraContent>
            <div class="flex justify-content align-center">
              <div class="extra-item">
                <a>今日</a>
                <a>本周</a>
                <a>本月</a>
                <a>本年</a>
              </div>
              <a-range-picker :style="{ width: '256px' }" />
            </div>
          </template>

          <a-tab-pane key="1" tab="销售额">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <h4 :style="{ marginBottom: '20px' }">销售额排行榜</h4>
                <EchartBar />
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <RankList title="排行榜" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" tab="访问">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <h4>访问排行榜</h4>
                <EchartBar />
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <RankList title="排行榜" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { dataList } from './data'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import RankList from './components/rankList'
import EchartBar from './components/echartBar'
import EchartLine from './components/echartLine'
const headStyle = {
  color: 'red',
  'font-size': '14px',
  'line-height': '16px',
  height: '16px',
  color: 'rgba(0,0,0,.45)'
}

// 销售/访问
const loading = ref(false)
const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '佛山' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}
</script>

<style lang="scss" scoped>
.chart-card-content {
  height: 120px;
}

.extra-item {
  a {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
