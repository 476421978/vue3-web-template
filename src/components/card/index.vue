<template>
  <div class="card">
    <a-card>
      <div class="chart-card-header" name="card-header">
        <div class="flex justify-between">
          <span class="text-sm">{{ title }}</span>
          <span class="text-sm">
            <ExclamationCircleOutlined />
          </span>
        </div>

        <div class="total" name="header-total">
          <a-statistic :value="112893" style="margin-right: 50px">
            <template #suffix> ¥ </template>
          </a-statistic>
        </div>
      </div>
      <div class="chart-card-content" name="card-content">
        <span>周同比12% <ArrowUpOutlined /></span>
        <span>日同比11% <ArrowDownOutlined /></span>
      </div>
      <a-divider type="horizontal" />
      <div class="chart-card-footer" name="card-footer">
        <span>日均销售额￥ 234.56</span>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const title = ref('标题')
</script>
