<template>
  <div>
    <a-modal v-model:visible="visible" :title="props.title.top || '标题'">
      <slot name="content">
        <div>{{ props }}</div>
      </slot>

      <template #footer>
        <div v-if="isHideFooter">
          <slot name="footer">
            <div></div>
          </slot>
        </div>
        <div v-else>
          <slot name="footer">
            <a-button key="back" @click="onHideModal">{{ props.title.cancel || '取消' }}</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">{{
              props.title.sure || '确定'
            }}</a-button>
          </slot>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'ant-design-vue'

const visible = ref(false)
const loading = ref(false)

// 父传子
const props = defineProps({
  title: {
    type: Object,
    default: () => {
      return {
        top: '标题',
        cancel: '取消',
        sure: '确定'
      }
    }
  },
  isHideFooter: {
    // 页脚
    type: Boolean,
    default: false
  }
})

// 子传父
const emit = defineEmits(['dialogOk'])

const onShowModal = function (item) {
  visible.value = true
  if (item) objInfo.value = item
}

const onHideModal = function () {
  visible.value = false
}

const handleOk = function () {
  const state = emit('dialogOk')
}

// 初始化
onMounted(() => {
  init()
})

const init = function () {}

// 将方法、变量暴露给父组件使用，父组件才可通过ref API拿到子组件暴露的数据
defineExpose({
  onShowModal,
  onHideModal
})
</script>
