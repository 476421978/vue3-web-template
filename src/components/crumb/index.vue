<template>
  <div v-if="getBread" class="crumb">
    <a-breadcrumb v-if="getBread.bread">
      <template v-for="(item, index) in getBread.bread" :key="index">
        <a-breadcrumb-item v-if="item.path">
          <a :href="item.path">{{ item.name }}</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-else>
          <span>{{ item.name }}</span>
        </a-breadcrumb-item>
      </template>
      <a-breadcrumb-item>
        <span>{{ getBread.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div name="title" class="margin-top-sm">
      <h3>{{ getBread.name }}</h3>
    </div>
    <div name="content"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { crumbData } from './data'
const props = defineProps({
  selectKey: {
    type: String,
    default: ''
  }
})

const getBread = computed(() => {
  const res = crumbData
    .map((item) => {
      if (item.key === props.selectKey) return item
    })
    .filter((obj) => {
      if (obj) {
        return true
      }
    })
  return res[0]
})
</script>

<style lang="scss">
.crumb {
  background-color: #fff;
  margin-top: 1px;
  padding: 20px;
}
</style>
