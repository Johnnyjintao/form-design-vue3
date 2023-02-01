<!-- 文字 -->
<template>
  <div v-if="data">
    <el-form-item label="默认内容">
      <el-input v-model="data.options.defaultValue" />
    </el-form-item>

    <el-form-item label="样式代码">
      <el-input v-model="data.options.style" />
    </el-form-item>

  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'textConfig',
  props: {
    select: {
      type: Object
    },
    hasKey: {
      type: Function
    }
  },
  emits: ['update:select'],
  setup(props, context){
    const data = ref<any>(props.select)
    watch(
      () => props.select,
      (val) => (data.value = val)
    )

    watch(data, (val) => context.emit('update:select', val), { deep: true })
    
    return {
      data,
    }
  },
})
</script>
  
  
  